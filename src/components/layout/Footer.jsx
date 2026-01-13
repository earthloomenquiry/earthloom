import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { APP_NAME, FOOTER_LINKS, SOCIAL_LINKS, CONTACT_INFO } from '../../utils/constants';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-16">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <img
                                src="/earthloom-logo.jpg"
                                alt="Earthloom Logo"
                                className="w-10 h-10 object-contain"
                            />
                            <h3 className="text-white text-lg font-bold">{APP_NAME}</h3>
                        </div>
                        <p className="text-sm mb-4">
                            Sustainable shopping for a better tomorrow. Discover eco-friendly products that care for you and our planet.
                        </p>
                        <div className="flex space-x-4">
                            <a href={SOCIAL_LINKS.facebook} className="hover:text-primary-400 transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href={SOCIAL_LINKS.twitter} className="hover:text-primary-400 transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href={SOCIAL_LINKS.instagram} className="hover:text-primary-400 transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href={SOCIAL_LINKS.youtube} className="hover:text-primary-400 transition-colors">
                                <FaYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    {/* About Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">About</h4>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.about.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Help Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Help</h4>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.help.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Policy Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Policy</h4>
                        <ul className="space-y-2">
                            {FOOTER_LINKS.policy.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-semibold text-white">Email:</span> {CONTACT_INFO.email}
                        </div>
                        <div>
                            <span className="font-semibold text-white">Phone:</span> {CONTACT_INFO.phone}
                        </div>
                        <div>
                            <span className="font-semibold text-white">Address:</span> {CONTACT_INFO.address}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
