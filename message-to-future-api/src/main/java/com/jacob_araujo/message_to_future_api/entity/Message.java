package com.jacob_araujo.message_to_future_api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Objects;

@Getter @Setter @AllArgsConstructor @NoArgsConstructor
@Entity
@Table(name = "messages", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"recipient_name", "opening_date_time"})
})
@EntityListeners(AuditingEntityListener.class)
public class Message implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "sender_user_id", nullable = false)
    private User senderUser;

    @Column(name = "message_text", nullable = false, length = 1000)
    private String messageText;

    @Column(name = "recipient_name", nullable = false, length = 100)
    private String recipientName;

    @Column(name = "opening_date_time", nullable = false)
    private LocalDateTime openingDateTime;

    @Column(name = "narrative_theme", length = 255)
    private String narrativeTheme;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 25)
    private StatusMessage status = StatusMessage.PENDING;

    @CreatedDate
    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @LastModifiedDate
    @Column(name = "modification_date")
    private LocalDateTime modificationDate;

    @CreatedBy
    @Column(name = "created_by")
    private String createBy;

    @LastModifiedBy
    @Column(name = "modified_by")
    private String modifiedBy;

    public enum StatusMessage {
        PENDING, AVAILABLE, OPENED
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Message message = (Message) o;
        return Objects.equals(id, message.id) && Objects.equals(senderUser, message.senderUser);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, senderUser);
    }

    @Override
    public String toString() {
        return "Message{" +
                "senderUserId=" + senderUser +
                ", id=" + id +
                '}';
    }
}
