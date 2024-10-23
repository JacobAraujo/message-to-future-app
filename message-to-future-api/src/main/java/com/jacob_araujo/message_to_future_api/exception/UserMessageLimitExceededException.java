package com.jacob_araujo.message_to_future_api.exception;

public class UserMessageLimitExceededException extends RuntimeException {
    public UserMessageLimitExceededException(String message) {
        super(message);
    }
}
