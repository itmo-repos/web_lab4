package com.lab4.utils;

import org.eclipse.microprofile.config.spi.ConfigSource;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

public class CustomConfigSource implements ConfigSource {

    private final Map<String, String> properties = new HashMap<>();

    public CustomConfigSource() {
        String path = "/home/studs/s467669/config/lab4.properties";
        try (FileInputStream fis = new FileInputStream(path)) {
            Properties props = new Properties();
            props.load(fis);
            for (String name : props.stringPropertyNames()) {
                properties.put(name, props.getProperty(name));
            }
        } catch (IOException e) {
            System.err.println("Не удалось загрузить файл конфигурации: " + path);
        }
    }

    @Override
    public Set<String> getPropertyNames() {
        return properties.keySet();
    }

    @Override
    public Map<String, String> getProperties() {
        return properties;
    }

    @Override
    public String getValue(String key) {
        return properties.get(key);
    }

    @Override
    public String getName() {
        return "CustomConfigSource";
    }
}
