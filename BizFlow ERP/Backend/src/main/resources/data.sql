INSERT INTO tenants (id, name, code, plan) VALUES
('tenant-demo', 'Acme Distribution Pvt Ltd', 'ACME', 'ENTERPRISE');

INSERT INTO app_users (id, tenant_id, name, email, password_hash, role, active) VALUES
('user-admin', 'tenant-demo', 'Aarav Sharma', 'admin@bizflow.test', '$2a$10$unused-demo-hash', 'SUPER_ADMIN', true);
