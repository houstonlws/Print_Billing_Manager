package com.houstonlewis.PrintBillMaster.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class EnvConfig {

    private static Environment env;

    @Autowired
    private Environment environment;

    public static String getEnv(String key) {
        return env.getProperty(key);
    }

    @PostConstruct
    public void init() {
        EnvConfig.env = environment;
    }

}
