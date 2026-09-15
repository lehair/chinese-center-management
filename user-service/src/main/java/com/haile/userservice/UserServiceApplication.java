package com.haile.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

import org.springframework.context.annotation.ComponentScan;
import com.haile.common.client.FeignClientInterceptor;

@SpringBootApplication
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.haile.common.client")
@org.springframework.context.annotation.Import(FeignClientInterceptor.class)
@ComponentScan({"com.haile.userservice", "com.haile.common.exception"})
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
