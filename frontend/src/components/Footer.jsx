import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="Footer">
      <div className="FooterContent">
        <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        <div className="FooterLinks">
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}
