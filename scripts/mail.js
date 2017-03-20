var mail = new SendGrid.Email({
    to: 'gabriela@adaptativamente.cl',
    from: 'gabriela@adaptativamente.cl',
    subject: '[Contacto] Test mail',
    text: 'This is a sample email message.'
});