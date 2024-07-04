import React from 'react'

function Footer() {
    return (
        <div class="footer-body">

            <footer class="footer">
                <div class="footer-container">
                    <div class="footer-section">
                        <h3>About Us</h3>
                        <p>We are committed to providing a secure and transparent voting system using blockchain technology. Our mission is to ensure every vote is counted accurately and securely.</p>
                    </div>
                    <div class="footer-section">
                        <h3>Contact</h3>
                        <ul>
                            <li>Email: support@blockballot.com</li>
                            <li>Phone: 7577830760</li>
                            <li>Address: Assam University, silchar</li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h3>Follow Us</h3>
                        <ul class="social-media">
                            <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            <li><a href="#"><i class="fab fa-github"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Blockballot. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
