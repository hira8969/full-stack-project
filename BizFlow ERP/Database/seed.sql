INSERT INTO tenants (name, code, plan) VALUES ('Acme Distribution Pvt Ltd', 'ACME', 'ENTERPRISE');

INSERT INTO users (tenant_id, name, email, password_hash, role) VALUES
(1, 'Aarav Sharma', 'admin@bizflow.test', 'replace-with-bcrypt', 'SUPER_ADMIN');

INSERT INTO crm_leads (tenant_id, company_name, contact_name, email, phone, status, deal_value) VALUES
(1, 'Northstar Retail', 'Meera Shah', 'meera@northstar.test', '+919900000001', 'INTERESTED', 420000),
(1, 'Metro Supplies', 'Kabir Singh', 'kabir@metro.test', '+919900000002', 'QUOTATION', 180000);

INSERT INTO products (tenant_id, sku, name, category, brand, reorder_level) VALUES
(1, 'BF-INV-001', 'Thermal Printer', 'POS Hardware', 'PrintPro', 10),
(1, 'BF-INV-002', 'Barcode Scanner', 'POS Hardware', 'ScanMax', 15);

INSERT INTO employees (tenant_id, employee_code, name, department, designation) VALUES
(1, 'EMP-001', 'Priya Nair', 'Sales', 'Sales Manager'),
(1, 'EMP-002', 'Rahul Mehta', 'Customer Success', 'CSM');
