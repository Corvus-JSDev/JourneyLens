import style from "./style.module.css";
import MainNavigation from "@/app/shared/components/Nav-Bar/MainNavigation";

export default function AboutPage() {
	return (
		<>
			<MainNavigation />

			<div className={style.AboutPage}>
				<h1>- About Us -</h1>
				<p>
					JourneyLens is a social media website that aims to connect people
					from around the world. It allows friends and families to share
					their adventures and travels with everyone. We're excited to
					build a community based on travel and adventuring beyond the
					norms.
				</p>

				<hr className={style.hr} />

				<h1>- Privacy policy -</h1>
				<p>
					Thank you for visiting JourneyLens. Your privacy is important to
					us, and we are committed to protecting the personal information
					you choose to share with us. This Privacy Policy explains how we
					collect, use, disclose, and safeguard your information when you
					visit our Website.
				</p>

				<div className={style.PPsection}>
					<h3>1. Information We Collect</h3>
					<p>
						We do not collect any personal information about you unless
						you voluntarily provide it to us. The information you provide
						may include: Full name Username Password Email address Any
						images or text uploaded to the Website
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>2. Use of Your Information</h3>
					<p>
						We may use the information we collect in the following ways:
						To operate and maintain the Website; To personalize your
						experience on the Website; To respond to your inquiries,
						questions, and/or other requests; To improve our Website and
						enhance user experience; To send you administrative
						communications, such as service announcements and updates on
						our policies.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>3. Disclosure of Your Information</h3>
					<p>
						We do not sell, trade, or otherwise transfer to outside
						parties your personally identifiable information. This does
						not include trusted third parties who assist us in operating
						our Website, conducting our business, or servicing you, so
						long as those parties agree to keep this information
						confidential.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>4. Security of Your Information</h3>
					<p>
						We implement security measures designed to protect your
						information from unauthorized access. We do not store
						sensitive personal information (such as credit card data) on
						our servers.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>5. Third-Party Links</h3>
					<p>
						Our Website may contain links to third-party websites. We have
						no control over the privacy practices or the content of these
						websites. We encourage you to review the privacy policies of
						any third-party websites you visit.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>6. Children's Privacy</h3>
					<p>
						Our Website is not intended for children under the age of 13.
						We do not knowingly collect or solicit personal information
						from anyone under the age of 13.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>7. Changes to This Privacy Policy</h3>
					<p>
						We may update this Privacy Policy from time to time in order
						to reflect, for example, changes to our practices or for other
						operational, legal, or regulatory reasons.
					</p>
				</div>

				<hr className={style.hr} />

				<h1>- Terms and conditions -</h1>
				<p>
					Thank you for using JourneyLens. These terms and conditions
					govern your access to and use of the Website. By accessing or
					using the Website, you agree to be bound by these terms and
					conditions.
				</p>

				<div className={style.PPsection}>
					<h3>1. Use of the Website</h3>
					<p>
						a. You must be at least 13 years old to use the Website. b.
						You agree to provide accurate and complete information when
						using the Website. c. You are responsible for maintaining the
						confidentiality of your account credentials and for all
						activities that occur under your account.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>2. User-Generated Content</h3>
					<p>
						a. You retain ownership of any content you upload, post, or
						otherwise make available on the Website. b. By submitting
						content to the Website, you grant us a non-exclusive,
						royalty-free, worldwide, perpetual, and irrevocable right to
						use, reproduce, modify, adapt, publish, translate, distribute,
						and display such content.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>3. Prohibited Activities</h3>
					<p>
						You agree not to: a. Use the Website in any unlawful manner or
						in any manner that could damage, disable, overburden, or
						impair the Website. b. Attempt to gain unauthorized access to
						any part of the Website. c. Upload or transmit viruses or any
						other type of malicious code.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>4. Intellectual Property Rights</h3>
					<p>
						a. All content on the Website, including text, graphics,
						logos, and images, is the property of [Your Company Name] or
						its licensors and is protected by copyright, trademark, and
						other intellectual property laws. b. You may not use,
						reproduce, modify, distribute, or display any of the content
						on the Website without the prior written consent of
						JourneyLens.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>5. Limitation of Liability</h3>
					<p>
						a. To the fullest extent permitted by law, JourneyLens shall
						not be liable for any indirect, incidental, special,
						consequential, or punitive damages, or any loss of profits or
						revenues, whether incurred directly or indirectly, or any loss
						of data, use, goodwill, or other intangible losses, resulting
						from (i) your access to or use of or inability to access or
						use the Website; (ii) any conduct or content of any third
						party on the Website.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>6. Changes to Terms and Conditions</h3>
					<p>
						We may update these terms and conditions from time to time
						without prior notice. The updated terms and conditions will be
						effective upon posting on the Website. Your continued use of
						the Website after any such changes constitutes your acceptance
						of the new terms and conditions.
					</p>
				</div>

				<div className={style.PPsection}>
					<h3>7. Governing Law</h3>
					<p>
						These terms and conditions shall be governed by and construed
						in accordance with the laws of the local jurisdiction, without
						regard to its conflict of law principles.
					</p>
				</div>
			</div>
		</>
	);
}
