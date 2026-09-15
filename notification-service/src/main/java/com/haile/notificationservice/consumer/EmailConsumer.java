package com.haile.notificationservice.consumer;

import com.haile.common.dto.queue.EmailMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender; // ĐÂY LÀ ĐƯỜNG DẪN CHUẨN
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class EmailConsumer {

    private final JavaMailSender mailSender;

    @RabbitListener(queues = "${app.rabbitmq.queue}")
    public void listenAndSendEmail(EmailMessage message) {
        try {
            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(message.getToEmail());
            mail.setSubject(message.getSubject());
            mail.setText(message.getContent());

            mailSender.send(mail);
            System.out.println("Đã gửi email thành công tới: " + message.getToEmail());
        } catch (Exception e) {
            System.err.println("Lỗi khi gửi email: " + e.getMessage());
        }
    }
}
