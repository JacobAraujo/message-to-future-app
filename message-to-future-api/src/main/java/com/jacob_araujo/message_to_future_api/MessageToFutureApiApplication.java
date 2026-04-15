package com.jacob_araujo.message_to_future_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@ConfigurationPropertiesScan
@SpringBootApplication
public class MessageToFutureApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(MessageToFutureApiApplication.class, args);
	}

}
