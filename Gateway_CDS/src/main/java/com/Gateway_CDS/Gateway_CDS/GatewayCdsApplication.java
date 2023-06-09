package com.Gateway_CDS.Gateway_CDS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;

@SpringBootApplication
@EnableZuulProxy
@EnableEurekaClient
public class GatewayCdsApplication {

	public static void main(String[] args) {
		SpringApplication.run(GatewayCdsApplication.class, args);
	}

}
