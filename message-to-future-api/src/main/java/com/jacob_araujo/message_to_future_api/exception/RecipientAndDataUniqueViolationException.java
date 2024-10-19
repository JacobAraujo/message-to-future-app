package com.jacob_araujo.message_to_future_api.exception;

public class RecipientAndDataUniqueViolationException extends RuntimeException {
    public RecipientAndDataUniqueViolationException(String message) {
        super(message);
    }
}
