<?php
// Set content type to JSON
header('Content-Type: application/json');

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Function to sanitize input
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Function to validate email
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Function to validate phone number
function validatePhone($phone) {
    // Remove all non-digit characters
    $phone = preg_replace('/[^0-9]/', '', $phone);
    // Check if it's a valid length (10-15 digits)
    return strlen($phone) >= 10 && strlen($phone) <= 15;
}

try {
    // Get and sanitize form data
    $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? sanitizeInput($_POST['phone']) : '';
    $subject = isset($_POST['subject']) ? sanitizeInput($_POST['subject']) : '';
    $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';

    // Validation
    $errors = [];

    // Name validation
    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Name must be at least 2 characters long';
    }

    // Email validation
    if (empty($email) || !validateEmail($email)) {
        $errors[] = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided, should be valid)
    if (!empty($phone) && !validatePhone($phone)) {
        $errors[] = 'Please enter a valid phone number';
    }

    // Subject validation
    $validSubjects = ['reservation', 'event', 'feedback', 'general'];
    if (empty($subject) || !in_array($subject, $validSubjects)) {
        $errors[] = 'Please select a valid subject';
    }

    // Message validation
    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'Message must be at least 10 characters long';
    }

    // If there are validation errors, return them
    if (!empty($errors)) {
        echo json_encode([
            'success' => false,
            'message' => 'Validation errors: ' . implode(', ', $errors)
        ]);
        exit;
    }

    // Prepare email content
    $to = 'info@bellavista.com'; // Restaurant email
    $emailSubject = 'New Contact Form Submission - ' . ucfirst($subject);
    
    // Email body
    $emailBody = "
    New contact form submission from Bella Vista Restaurant website:
    
    Name: {$name}
    Email: {$email}
    Phone: " . (!empty($phone) ? $phone : 'Not provided') . "
    Subject: " . ucfirst($subject) . "
    
    Message:
    {$message}
    
    ---
    This message was sent from the Bella Vista Restaurant contact form.
    Reply to: {$email}
    Submission time: " . date('Y-m-d H:i:s') . "
    ";

    // Email headers
    $headers = [
        'From: noreply@bellavista.com',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];

    // Send email
    $emailSent = mail($to, $emailSubject, $emailBody, implode("\r\n", $headers));

    if ($emailSent) {
        // Log the submission (optional)
        $logEntry = date('Y-m-d H:i:s') . " - Contact form submission from {$name} ({$email})\n";
        
        // Create logs directory if it doesn't exist
        if (!is_dir('logs')) {
            mkdir('logs', 0755, true);
        }
        
        // Write to log file
        file_put_contents('logs/contact_submissions.log', $logEntry, FILE_APPEND | LOCK_EX);

        // Success response
        echo json_encode([
            'success' => true,
            'message' => 'Thank you for your message! We will get back to you within 24 hours.'
        ]);
    } else {
        // Email sending failed
        echo json_encode([
            'success' => false,
            'message' => 'Sorry, there was an error sending your message. Please try again or call us directly at (555) 123-4567.'
        ]);
    }

} catch (Exception $e) {
    // Log the error
    error_log('Contact form error: ' . $e->getMessage());
    
    // Return error response
    echo json_encode([
        'success' => false,
        'message' => 'An unexpected error occurred. Please try again later or contact us directly.'
    ]);
}

// Optional: Auto-responder email to the user
function sendAutoResponder($userEmail, $userName) {
    $subject = 'Thank you for contacting Bella Vista Restaurant';
    $message = "
    Dear {$userName},
    
    Thank you for contacting Bella Vista Restaurant. We have received your message and will respond within 24 hours.
    
    In the meantime, feel free to:
    - Visit our website to view our menu
    - Call us at (555) 123-4567 for immediate assistance
    - Follow us on social media for updates
    
    We look forward to hearing from you soon!
    
    Best regards,
    The Bella Vista Team
    
    ---
    Bella Vista Restaurant
    123 Restaurant Street
    Downtown District
    City, State 12345
    Phone: (555) 123-4567
    Email: info@bellavista.com
    ";
    
    $headers = [
        'From: info@bellavista.com',
        'Reply-To: info@bellavista.com',
        'X-Mailer: PHP/' . phpversion(),
        'Content-Type: text/plain; charset=UTF-8'
    ];
    
    return mail($userEmail, $subject, $message, implode("\r\n", $headers));
}

// Send auto-responder if main email was sent successfully
if (isset($emailSent) && $emailSent && !empty($email) && !empty($name)) {
    sendAutoResponder($email, $name);
}
?>
