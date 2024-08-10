// pages/about.js
import React from "react";
import Link from "next/link";
import Image from "next/image";

const AboutPage = () => {
	return (
		<div className="container mx-auto mt-16">
			<h1 className="text-4xl font-bold text-center mb-8">About PopcornBuddy</h1>

			<section className="mb-12">
				<p className="text-lg text-gray-700 mb-4">
					Welcome to{" "}
					<strong>
						<i>PopcornBuddy</i>
					</strong>
					, your go-to platform for movie enthusiasts! We provide detailed information
					about your favorite movies, allow you to write reviews, and create personalized
					watchlists. Whether you’re a casual viewer or a cinephile, PopcornBuddy is
					designed to enhance your movie experience.
				</p>
				<p className="text-lg text-gray-700">
					If you have any questions or need support, feel free to reach out to us at:
					<Link href="mailto:popcornbuddy@example.com" className="underline-decoration">
						&nbsp;popcornbuddywebsite@gmail.com
					</Link>
					.
				</p>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Meet the Team</h2>
				<div className="space-y-4">
					<div className="bg-white p-4 rounded-lg shadow-md p-8">
						<h3 className="text-xl font-bold text-gray-800">Mike Dohyun Lim</h3>
						<p className="text-gray-600">Full-stack Web developer</p>
						<Link
							href="https://github.com/mikeylim"
							target="_blank"
							rel="noopener noreferrer">
							<Image
								className="inline mr-2"
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
								className="inline mr-2"
								src="/linkedin-icon.svg"
								width={30}
								height={30}
								alt="LinkedIn Icon"
							/>
						</Link>
						<Link href="mailto:mikedohyunlim@gmail.com" target="_blank" rel="noopener noreferrer">
							<Image
								className="inline mr-2"
								src="/email-icon.svg"
								width={30}
								height={30}
								alt="Email Icon"
							/>
						</Link>
					</div>

					<div className="bg-white p-4 rounded-lg shadow-md p-8">
						<h3 className="text-xl font-bold text-gray-800">Claudia Suarez</h3>
						<p className="text-gray-600">Full-stack Web developer</p>
						<div>
							<Link
								href="https://github.com/cSuarez13"
								target="_blank"
								rel="noopener noreferrer">
								<Image
									className="inline mr-2"
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
									className="inline mr-2"
									src="/linkedin-icon.svg"
									width={30}
									height={30}
									alt="LinkedIn Icon"
								/>
							</Link>
							<Link href="/" target="_blank" rel="noopener noreferrer">
								<Image
									className="inline mr-2"
									src="/email-icon.svg"
									width={30}
									height={30}
									alt="Email Icon"
								/>
							</Link>
						</div>
					</div>

					<div className="bg-white p-4 rounded-lg shadow-md p-8">
						<h3 className="text-xl font-bold text-gray-800">Gaganjot Singh</h3>
						<p className="text-gray-600">Full-stack Web developer</p>
						<Link
							href="/"
							target="_blank"
							rel="noopener noreferrer">
							<Image
								className="inline mr-2"
								src="/github-icon.svg"
								width={30}
								height={30}
								alt="Github Icon"
							/>
						</Link>
						<Link
							href="/"
							target="_blank"
							rel="noopener noreferrer">
							<Image
								className="inline mr-2"
								src="/linkedin-icon.svg"
								width={30}
								height={30}
								alt="LinkedIn Icon"
							/>
						</Link>
						<Link href="/" target="_blank" rel="noopener noreferrer">
							<Image
								className="inline mr-2"
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
	);
};

export default AboutPage;
