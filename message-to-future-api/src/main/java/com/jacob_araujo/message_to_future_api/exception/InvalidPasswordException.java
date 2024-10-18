package com.jacob_araujo.message_to_future_api.exception;

public class InvalidPasswordException extends RuntimeException{
    public InvalidPasswordException(String message){
        super(message);
    }
}
