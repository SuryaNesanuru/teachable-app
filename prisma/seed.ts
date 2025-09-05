import { PrismaClient, UserRole, LessonType } from '../src/generated/prisma';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	const passwordHash = await hash('password123', 10);

	const [student, instructor, admin] = await Promise.all([
		prisma.user.upsert({
			where: { email: 'student@example.com' },
			update: {},
			create: { email: 'student@example.com', name: 'Student One', role: UserRole.STUDENT, image: null, passwordHash },
		}),
		prisma.user.upsert({
			where: { email: 'instructor@example.com' },
			update: {},
			create: { email: 'instructor@example.com', name: 'Instructor One', role: UserRole.INSTRUCTOR, image: null, passwordHash },
		}),
		prisma.user.upsert({
			where: { email: 'admin@example.com' },
			update: {},
			create: { email: 'admin@example.com', name: 'Admin', role: UserRole.ADMIN, image: null, passwordHash },
		}),
	]);

	const category = await prisma.category.upsert({
		where: { slug: 'web-development' },
		update: {},
		create: { slug: 'web-development', name: 'Web Development' },
	});

	const course = await prisma.course.upsert({
		where: { slug: 'nextjs-for-beginners' },
		update: {},
		create: {
			title: 'Next.js for Beginners',
			slug: 'nextjs-for-beginners',
			subtitle: 'Build modern apps with Next.js',
			description: 'Learn the basics of Next.js 15, App Router, and full-stack features.',
			level: 'Beginner',
			priceCents: 4900,
			isPublished: true,
			categoryId: category.id,
			instructorId: instructor.id,
			modules: {
				create: [
					{
						title: 'Introduction',
						order: 1,
						lessons: {
							create: [
								{ title: 'Welcome', order: 1, type: LessonType.VIDEO, videoUrl: 'https://example.com/welcome.mp4', isFreePreview: true },
								{ title: 'What is Next.js?', order: 2, type: LessonType.ARTICLE, isFreePreview: true },
							],
						},
					},
					{
						title: 'Core Concepts',
						order: 2,
						lessons: {
							create: [
								{ title: 'Routing', order: 1, type: LessonType.VIDEO, videoUrl: 'https://example.com/routing.mp4' },
								{ title: 'Data Fetching', order: 2, type: LessonType.VIDEO, videoUrl: 'https://example.com/data.mp4' },
								{ title: 'PDF Sample', order: 3, type: LessonType.PDF, pdfUrl: 'https://example.com/sample.pdf', pdfPassword: 'sample' },
							],
						},
					},
				],
			},
		},
		include: { modules: { include: { lessons: true } } },
	});

	await prisma.purchase.upsert({
		where: { userId_courseId: { userId: student.id, courseId: course.id } },
		update: {},
		create: {
			userId: student.id,
			courseId: course.id,
			amountCents: 4900,
			currency: 'usd',
			provider: 'stripe',
			providerId: 'pi_demo',
			invoiceUrl: 'https://example.com/invoice.pdf',
		},
	});

	await prisma.review.upsert({
		where: { userId_courseId: { userId: student.id, courseId: course.id } },
		update: {},
		create: { userId: student.id, courseId: course.id, rating: 5, comment: 'Excellent intro course!' },
	});

	console.log('Seed completed');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});


