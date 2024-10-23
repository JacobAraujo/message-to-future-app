package com.jacob_araujo.message_to_future_api.web.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name= "Mensagens", description = "Contém operações relacionadas com a recuperação da mensagem pelo link específico")
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/links")
public class LinkController {
}
