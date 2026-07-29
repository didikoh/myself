CREATE TABLE IF NOT EXISTS `chat_history` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `conversation_id` CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    `turn_id` CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
    `user_message` TEXT NOT NULL,
    `assistant_message` TEXT NOT NULL,
    `response_status` VARCHAR(20) CHARACTER SET ascii COLLATE ascii_bin NOT NULL DEFAULT 'completed',
    `prompt_tokens` INT UNSIGNED NULL,
    `response_tokens` INT UNSIGNED NULL,
    `total_tokens` INT UNSIGNED NULL,
    `finish_reason` VARCHAR(64) NULL,
    `portfolio_data_updated_at` DATE NULL,
    `retrieved_sections` TEXT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_chat_history_turn` (`conversation_id`, `turn_id`),
    KEY `idx_chat_history_conversation_created` (`conversation_id`, `created_at`),
    KEY `idx_chat_history_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

