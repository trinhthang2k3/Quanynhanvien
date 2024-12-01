const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./employees.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

const employees = [
    { name: "Nguyễn Văn A", dob: "1990-01-01", position: "Nhân viên kinh doanh" },
    { name: "Trần Thị B", dob: "1992-03-15", position: "Nhân viên kế toán" },
    { name: "Phạm Văn C", dob: "1988-07-20", position: "Quản lý" },
    { name: "Lê Thị D", dob: "1995-12-05", position: "Nhân viên IT" },
    { name: "Hoàng Văn E", dob: "2000-05-10", position: "Thực tập sinh" },
];

db.serialize(() => {
    db.run('DELETE FROM employees'); // Xóa dữ liệu cũ (nếu cần)
    employees.forEach((employee) => {
        db.run(
            'INSERT INTO employees (name, dob, position) VALUES (?, ?, ?)',
            [employee.name, employee.dob, employee.position],
            (err) => {
                if (err) {
                    console.error('Error inserting data:', err.message);
                }
            }
        );
    });
    console.log('Seeding completed.');
});

db.close();
