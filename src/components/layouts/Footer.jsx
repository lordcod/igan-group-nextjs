import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#002147] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Контакты</h3>
          <p>г. Москва, ул. Примерная, д. 1</p>
          <p>Телефон: +7 (495) 123-45-67</p>
          <p>Email: info@igangrupp.ru</p>
        </div>

        <div className="mt-6 md:mt-0 flex space-x-6 items-center text-white">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[#f0a500] transition"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:text-[#f0a500] transition"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            aria-label="Twitter"
            className="hover:text-[#f0a500] transition"
          >
            <FaTwitter size={24} />
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-[#004b9b] text-center text-sm text-[#a0a0a0]">
        © 2025 ИГАН ГРУПП. Все права защищены.
      </div>
    </footer>
  );
}
