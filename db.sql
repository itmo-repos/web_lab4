CREATE TABLE s467669.lab4_table (
    id SERIAL PRIMARY KEY,
    x NUMERIC(38, 20) NOT NULL,
    y NUMERIC(38, 20) NOT NULL,
    r NUMERIC(38, 20) NOT NULL,
    hit BOOLEAN NOT NULL
);

CREATE TABLE lab4_users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    -- Хэш пароля: алгоритм (PBKDF2WithHmacSHA256) + соль + перец
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    token_version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE lab4_refresh_tokens (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    token_hash VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    revoked BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

