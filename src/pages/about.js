// pages/about.js
import Head from 'next/head';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../../src/styles/About.module.css";

const AboutPage = () => {
	return (
		<>
  <Head>
        <title>PopcornBuddy - About Us</title>
        <meta name="description" content="Learn more about PopcornBuddy's creators." />
      </Head>
		<div className="container mx-auto mt-16">
			<h1 className="btn-submit text-4xl font-bold text-center p-10 mb-8">
				About PopcornBuddy
			</h1>

			<section className="mb-12">
				<p className="text-lg main-color mb-4">
					Welcome to{" "}
					<strong>
						<i>PopcornBuddy</i>
					</strong>
					, your go-to platform for movie enthusiasts! We provide detailed information
					about your favorite movies, allow you to give star ratings, and create personalized
					watchlists. Whether you’re a casual viewer or a cinephile, PopcornBuddy is
					designed to enhance your movie experience!
				</p>
				<p className="text-lg main-color my-8">
					If you have any questions or need support, feel free to reach out to us at:
					<Link
						href="mailto:popcornbuddy@example.com"
						target="_blank"
						className="text-[#136cb2] italic">
						&nbsp;popcornbuddywebsite@gmail.com
					</Link>
					.
				</p>
			</section>

			<section className="mb-12">
				<h2 className="main-color text-2xl font-bold mb-6">Meet the Team</h2>
				<div className="space-y-4">
					<div className={`${styles.teamCard} bg-white p-4 rounded-lg shadow-md p-8`}>
						<h3 className="main-color text-xl font-semibold">Mike Dohyun Lim</h3>
						<p className="text-gray-600 mt-0.5 mb-1">Full Stack Web Developer</p>
						<Link
							href="https://github.com/mikeylim"
							target="_blank"
							rel="noopener noreferrer">
							<Image
								className={`${styles.socialCard} inline mr-2`}
								src="/github-icon.svg"
								width={30}
								height={30}
								alt="Github Icon"
							/>
						</Link>
						<Link
							href="https://www.linkedin.com/in/mikedohyunlim/"
							target="_blank"
							rel="noopener noreferrer">
							<Image
								className={`${styles.socialCard} inline mr-2`}
								src="/linkedin-icon.svg"
								width={30}
								height={30}
								alt="LinkedIn Icon"
							/>
						</Link>
						<Link
							href="mailto:mikedohyunlim@gmail.com"
							target="_blank"
							rel="noopener noreferrer">
							<Image
								className={`${styles.socialCard} inline mr-2`}
								src="/email-icon.svg"
								width={30}
								height={30}
								alt="Email Icon"
							/>
						</Link>
					</div>

					<div className={`${styles.teamCard} bg-white p-4 rounded-lg shadow-md p-8`}>
						<h3 className="main-color text-xl font-semibold">Claudia Suarez</h3>
						<p className="text-gray-600 mt-0.5 mb-1">Full Stack Web Developer</p>
						<div>
							<Link
								href="https://github.com/cSuarez13"
								target="_blank"
								rel="noopener noreferrer">
								<Image
									className={`${styles.socialCard} inline mr-2`}
									src="/github-icon.svg"
									width={30}
									height={30}
									alt="Github Icon"
								/>
							</Link>
							<Link
								href="https://www.linkedin.com/in/claudia-suarez-a27b09265/"
								target="_blank"
								rel="noopener noreferrer">
								<Image
									className={`${styles.socialCard} inline mr-2`}
									src="/linkedin-icon.svg"
									width={30}
									height={30}
									alt="LinkedIn Icon"
								/>
							</Link>
							<Link href="mailto:csuarez-socorro@myseneca.ca" target="_blank" rel="noopener noreferrer">
								<Image
									className={`${styles.socialCard} inline mr-2`}
									src="/email-icon.svg"
									width={30}
									height={30}
									alt="Email Icon"
								/>
							</Link>
						</div>
					</div>

					<div className={`${styles.teamCard} bg-white p-4 rounded-lg shadow-md p-8`}>
						<h3 className="main-color text-xl font-semibold">Gaganjot Singh</h3>
						<p className="text-gray-600 mt-0.5 mb-1">Full Stack Web Developer</p>
						<Link href="/" target="_blank" rel="noopener noreferrer">
							<Image
								className={`${styles.socialCard} inline mr-2`}
								src="/github-icon.svg"
								width={30}
								height={30}
								alt="Github Icon"
							/>
						</Link>
						<Link href="/" target="_blank" rel="noopener noreferrer">
							<Image
								className={`${styles.socialCard} inline mr-2`}
								src="/linkedin-icon.svg"
								width={30}
								height={30}
								alt="LinkedIn Icon"
							/>
						</Link>
						<Link href="/" target="_blank" rel="noopener noreferrer">
							<Image
								className={`${styles.socialCard} inline mr-2`}
								src="/email-icon.svg"
								width={30}
								height={30}
								alt="Email Icon"
							/>
						</Link>
					</div>
				</div>
			</section>
		</div>
		</>
	);
};

export default AboutPage;
