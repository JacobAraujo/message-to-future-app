package com.jacob_araujo.message_to_future_api.web.dto.mapper;

import com.jacob_araujo.message_to_future_api.entity.User;
import com.jacob_araujo.message_to_future_api.web.dto.UserCreateDto;
import com.jacob_araujo.message_to_future_api.web.dto.UserResponseDto;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;

import java.util.List;
import java.util.stream.Collectors;

public class UserMapper {

    public static User toUser(UserCreateDto createDto){
        return new ModelMapper().map(createDto, User.class);
    }

    public static UserResponseDto toDto(User user) {
        return new ModelMapper().map(user, UserResponseDto.class);
    }
}
