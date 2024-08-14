// pages/terms.js
import Head from 'next/head';
import React from "react";

const TermsPage = () => {
	return (
		<>
  <Head>
        <title>PopcornBuddy - Terms and Conditions</title>
        <meta name="description" content="PopcornBuddy Terms of Service." />
      </Head>
		<div className="container mx-auto p-6 mt-16" style={{ color: '#001F3F' }}>
			<h1 className="text-4xl font-bold text-center mb-8">Terms and Conditions</h1>

			<div className="text-lg leading-8">
				<section className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
					<p>
						Welcome to PopcornBuddy! These terms and conditions outline the rules and
						regulations for the use of our website. By accessing this website, we assume
						you accept these terms and conditions in full. Do not continue to use
						PopcornBuddy if you do not accept all of the terms and conditions stated on
						this page.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">2. Intellectual Property Rights</h2>
					<p>
						Unless otherwise stated, PopcornBuddy and/or its licensors own the
						intellectual property rights for all material on PopcornBuddy. All
						intellectual property rights are reserved. You may view and/or print pages
						from https://popcornbuddy.vercel.app/ for your own personal use, subject to
						restrictions set in these terms and conditions.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">3. User Content</h2>
					<p>
						In these terms and conditions, &quotYour Content&quot shall mean any audio, video
						text, images, or other material you choose to display on this Website. By
						displaying Your Content, you grant PopcornBuddy a non-exclusive, worldwide
						irrevocable, sub-licensable license to use, reproduce, adapt, publish,
						translate and distribute it in any and all media.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">4. Restrictions</h2>
					<p>You are specifically restricted from all of the following:</p>
					<ul className="list-disc ml-6">
						<li>
							Publishing any Website material in any other media without our
							permission.
						</li>
						<li>
							Selling, sublicensing, and/or otherwise commercializing any Website
							material.
						</li>
						<li>
							Using this Website in any way that is or may be damaging to this
							Website.
						</li>
						<li>Using this Website contrary to applicable laws and regulations.</li>
					</ul>
				</section>

				<section className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
					<p>
						In no event shall PopcornBuddy, nor any of its officers, directors, and
						employees, be held liable for anything arising out of or in any way
						connected with your use of this Website, whether such liability is under
						contract. PopcornBuddy, including its officers, directors, and employees
						shall not be held liable for any indirect, consequential, or special
						liability arising out of or in any way related to your use of this Website.
					</p>
				</section>

				<section className="mb-6">
					<h2 className="text-2xl font-semibold mb-2">6. Governing Law & Jurisdiction</h2>
					<p>
						These Terms will be governed by and interpreted in accordance with the laws
						of the Province of Ontario, and you submit to the non-exclusive
						jurisdiction of the state and federal courts located in Province of Ontario for the
						resolution of any disputes.
					</p>
				</section>
			</div>
		</div>
		</>
	);
};

export default TermsPage;
