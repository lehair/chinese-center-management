package com.haile.common.dto.queue;

import java.io.Serializable;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmailMessage implements Serializable {
    private static final long serialVersionUID = 1L;
    private String toEmail;
    private String fullName;
    private String subject;
    private String content;
}