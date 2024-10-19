package com.jacob_araujo.message_to_future_api.web.dto.mapper;

import com.jacob_araujo.message_to_future_api.entity.Message;
import com.jacob_araujo.message_to_future_api.web.dto.MessageCreateDto;
import com.jacob_araujo.message_to_future_api.web.dto.MessageResponseDto;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

public class MessageMapper {

    public static Message toMessage(MessageCreateDto createDto) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        String openingDateTimeStr = createDto.getOpeningDateTime();
        if (openingDateTimeStr == null) {
            throw new IllegalArgumentException("OpeningDateTime cannot be null");
        }
        LocalDateTime openingDateTime = LocalDateTime.parse(openingDateTimeStr, formatter);

        ModelMapper mapperMain = new ModelMapper();
        TypeMap<MessageCreateDto, Message> propertyMapper = mapperMain.createTypeMap(MessageCreateDto.class, Message.class);
        propertyMapper.addMappings(
                mapper -> mapper.map(src -> openingDateTime, Message::setOpeningDateTime)
        );

        return mapperMain.map(createDto, Message.class);
    }



    public static MessageResponseDto toDto(Message message) {
        String status = message.getStatus().name();
        ModelMapper mapperMain = new ModelMapper();
        TypeMap<Message, MessageResponseDto> propertyMapper = mapperMain.createTypeMap(Message.class, MessageResponseDto.class);
        propertyMapper.addMappings(
                mapper -> mapper.map(src -> status, MessageResponseDto::setStatus)
        );
        return mapperMain.map(message, MessageResponseDto.class);
    }

    public static List<MessageResponseDto> toListDto(List<Message> messages){
        return messages.stream().map(message -> toDto(message)).collect(Collectors.toList());
    }
}

