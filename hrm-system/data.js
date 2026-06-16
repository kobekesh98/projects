/**
 * HRM System — Mock Data Store
 * Centralized in-memory data for all HR modules.
 * In production, replace with API calls.
 */

const HRMData = {
  /* ?? Employees ?? */
  employees: [
    { id: 'EMP001', firstName: 'Sarah', lastName: 'Mitchell', email: 'sarah.mitchell@nexora.io', department: 'Engineering', position: 'Senior Developer', status: 'Active', joinDate: '2022-03-15', salary: 95000, phone: '+1 555-0101' },
    { id: 'EMP002', firstName: 'James', lastName: 'Chen', email: 'james.chen@nexora.io', department: 'Marketing', position: 'Marketing Manager', status: 'Active', joinDate: '2021-08-22', salary: 82000, phone: '+1 555-0102' },
    { id: 'EMP003', firstName: 'Aisha', lastName: 'Patel', email: 'aisha.patel@nexora.io', department: 'HR', position: 'HR Specialist', status: 'Active', joinDate: '2023-01-10', salary: 68000, phone: '+1 555-0103' },
    { id: 'EMP004', firstName: 'Marcus', lastName: 'Johnson', email: 'marcus.j@nexora.io', department: 'Finance', position: 'Financial Analyst', status: 'Active', joinDate: '2022-11-05', salary: 75000, phone: '+1 555-0104' },
    { id: 'EMP005', firstName: 'Elena', lastName: 'Rodriguez', email: 'elena.r@nexora.io', department: 'Engineering', position: 'QA Engineer', status: 'On Leave', joinDate: '2023-06-18', salary: 72000, phone: '+1 555-0105' },
    { id: 'EMP006', firstName: 'David', lastName: 'Kim', email: 'david.kim@nexora.io', department: 'Sales', position: 'Sales Director', status: 'Active', joinDate: '2020-04-30', salary: 110000, phone: '+1 555-0106' },
    { id: 'EMP007', firstName: 'Priya', lastName: 'Sharma', email: 'priya.s@nexora.io', department: 'Design', position: 'UX Designer', status: 'Active', joinDate: '2023-09-01', salary: 78000, phone: '+1 555-0107' },
    { id: 'EMP008', firstName: 'Thomas', lastName: 'Weber', email: 'thomas.w@nexora.io', department: 'Operations', position: 'Operations Lead', status: 'Inactive', joinDate: '2019-12-12', salary: 88000, phone: '+1 555-0108' },
  ],

  /* ?? Departments ?? */
  departments: [
    { id: 'DEPT01', name: 'Engineering', head: 'Sarah Mitchell', employees: 24, budget: 2400000, location: 'Building A, Floor 3' },
    { id: 'DEPT02', name: 'Marketing', head: 'James Chen', employees: 12, budget: 980000, location: 'Building B, Floor 2' },
    { id: 'DEPT03', name: 'HR', head: 'Aisha Patel', employees: 6, budget: 450000, location: 'Building A, Floor 1' },
    { id: 'DEPT04', name: 'Finance', head: 'Marcus Johnson', employees: 8, budget: 720000, location: 'Building A, Floor 2' },
    { id: 'DEPT05', name: 'Sales', head: 'David Kim', employees: 18, budget: 1500000, location: 'Building C, Floor 1' },
    { id: 'DEPT06', name: 'Design', head: 'Priya Sharma', employees: 7, budget: 560000, location: 'Building B, Floor 3' },
    { id: 'DEPT07', name: 'Operations', head: 'Thomas Weber', employees: 10, budget: 890000, location: 'Building C, Floor 2' },
  ],

  /* ?? Recruitment ?? */
  jobPostings: [
    { id: 'JOB001', title: 'Full Stack Developer', department: 'Engineering', type: 'Full-time', status: 'Open', applicants: 34, posted: '2026-05-01', salary: '$90k–$120k' },
    { id: 'JOB002', title: 'Product Marketing Manager', department: 'Marketing', type: 'Full-time', status: 'Open', applicants: 18, posted: '2026-05-10', salary: '$85k–$105k' },
    { id: 'JOB003', title: 'Data Analyst Intern', department: 'Finance', type: 'Internship', status: 'Open', applicants: 52, posted: '2026-05-15', salary: '$25/hr' },
    { id: 'JOB004', title: 'Senior UX Researcher', department: 'Design', type: 'Full-time', status: 'Closed', applicants: 21, posted: '2026-04-01', salary: '$95k–$115k' },
  ],

  candidates: [
    { id: 'CAN001', name: 'Alex Turner', role: 'Full Stack Developer', stage: 'Interview', email: 'alex.t@email.com', applied: '2026-05-03' },
    { id: 'CAN002', name: 'Maria Lopez', role: 'Full Stack Developer', stage: 'Screening', email: 'maria.l@email.com', applied: '2026-05-05' },
    { id: 'CAN003', name: 'Ryan O\'Brien', role: 'Product Marketing Manager', stage: 'Offer', email: 'ryan.o@email.com', applied: '2026-05-12' },
    { id: 'CAN004', name: 'Nina Kowalski', role: 'Data Analyst Intern', stage: 'Applied', email: 'nina.k@email.com', applied: '2026-05-16' },
    { id: 'CAN005', name: 'Chris Park', role: 'Full Stack Developer', stage: 'Applied', email: 'chris.p@email.com', applied: '2026-05-18' },
    { id: 'CAN006', name: 'Fatima Al-Rashid', role: 'Data Analyst Intern', stage: 'Interview', email: 'fatima.a@email.com', applied: '2026-05-17' },
  ],

  /* ?? Attendance ?? */
  attendance: [
    { id: 'ATT001', employeeId: 'EMP001', date: '2026-06-02', checkIn: '08:55', checkOut: '17:30', status: 'Present', hours: 8.5 },
    { id: 'ATT002', employeeId: 'EMP002', date: '2026-06-02', checkIn: '09:10', checkOut: '18:00', status: 'Late', hours: 8.8 },
    { id: 'ATT003', employeeId: 'EMP003', date: '2026-06-02', checkIn: '08:45', checkOut: '17:15', status: 'Present', hours: 8.5 },
    { id: 'ATT004', employeeId: 'EMP004', date: '2026-06-02', checkIn: '—', checkOut: '—', status: 'Absent', hours: 0 },
    { id: 'ATT005', employeeId: 'EMP005', date: '2026-06-02', checkIn: '—', checkOut: '—', status: 'On Leave', hours: 0 },
    { id: 'ATT006', employeeId: 'EMP006', date: '2026-06-02', checkIn: '08:30', checkOut: '17:45', status: 'Present', hours: 9.2 },
  ],

  /* ?? Leave requests ?? */
  leaveRequests: [
    { id: 'LV001', employeeId: 'EMP005', type: 'Sick Leave', startDate: '2026-06-01', endDate: '2026-06-05', days: 5, status: 'Approved', reason: 'Medical recovery' },
    { id: 'LV002', employeeId: 'EMP001', type: 'Annual Leave', startDate: '2026-06-15', endDate: '2026-06-20', days: 6, status: 'Pending', reason: 'Family vacation' },
    { id: 'LV003', employeeId: 'EMP007', type: 'Personal Leave', startDate: '2026-06-10', endDate: '2026-06-10', days: 1, status: 'Approved', reason: 'Personal appointment' },
    { id: 'LV004', employeeId: 'EMP002', type: 'Annual Leave', startDate: '2026-07-01', endDate: '2026-07-14', days: 14, status: 'Pending', reason: 'Summer holiday' },
    { id: 'LV005', employeeId: 'EMP004', type: 'Sick Leave', startDate: '2026-06-02', endDate: '2026-06-02', days: 1, status: 'Rejected', reason: 'No medical certificate provided' },
  ],

  /* ?? Payroll ?? */
  payroll: [
    { id: 'PAY001', employeeId: 'EMP001', period: 'May 2026', baseSalary: 95000, bonus: 2000, deductions: 18500, netPay: 78500, status: 'Paid' },
    { id: 'PAY002', employeeId: 'EMP002', period: 'May 2026', baseSalary: 82000, bonus: 1500, deductions: 15800, netPay: 67700, status: 'Paid' },
    { id: 'PAY003', employeeId: 'EMP003', period: 'May 2026', baseSalary: 68000, bonus: 0, deductions: 12400, netPay: 55600, status: 'Paid' },
    { id: 'PAY004', employeeId: 'EMP004', period: 'May 2026', baseSalary: 75000, bonus: 1000, deductions: 14200, netPay: 61800, status: 'Processing' },
    { id: 'PAY005', employeeId: 'EMP006', period: 'May 2026', baseSalary: 110000, bonus: 5000, deductions: 22000, netPay: 93000, status: 'Paid' },
  ],

  /* ?? Performance reviews ?? */
  performance: [
    { id: 'PERF01', employeeId: 'EMP001', period: 'Q1 2026', rating: 4.5, reviewer: 'CTO', goals: 8, goalsCompleted: 7, status: 'Completed' },
    { id: 'PERF02', employeeId: 'EMP002', period: 'Q1 2026', rating: 4.0, reviewer: 'CMO', goals: 6, goalsCompleted: 5, status: 'Completed' },
    { id: 'PERF03', employeeId: 'EMP003', period: 'Q1 2026', rating: 4.8, reviewer: 'CHRO', goals: 5, goalsCompleted: 5, status: 'Completed' },
    { id: 'PERF04', employeeId: 'EMP006', period: 'Q2 2026', rating: 0, reviewer: 'CEO', goals: 10, goalsCompleted: 3, status: 'In Progress' },
    { id: 'PERF05', employeeId: 'EMP007', period: 'Q2 2026', rating: 0, reviewer: 'Design Lead', goals: 4, goalsCompleted: 2, status: 'In Progress' },
  ],

  /* ?? Training courses ?? */
  training: [
    { id: 'TRN001', title: 'Leadership Essentials', category: 'Management', duration: '8 hours', enrolled: 15, capacity: 20, instructor: 'Dr. Helen Wright', status: 'Active' },
    { id: 'TRN002', title: 'Cybersecurity Awareness', category: 'Compliance', duration: '4 hours', enrolled: 42, capacity: 50, instructor: 'IT Security Team', status: 'Active' },
    { id: 'TRN003', title: 'Advanced Excel for Finance', category: 'Technical', duration: '12 hours', enrolled: 8, capacity: 15, instructor: 'Marcus Johnson', status: 'Active' },
    { id: 'TRN004', title: 'Diversity & Inclusion Workshop', category: 'Soft Skills', duration: '6 hours', enrolled: 30, capacity: 30, instructor: 'External Facilitator', status: 'Full' },
    { id: 'TRN005', title: 'Agile Project Management', category: 'Management', duration: '16 hours', enrolled: 0, capacity: 25, instructor: 'Sarah Mitchell', status: 'Upcoming' },
  ],

  /* ?? Benefits ?? */
  benefits: [
    { id: 'BEN001', name: 'Health Insurance', type: 'Medical', coverage: 'Full family', provider: 'BlueCross', cost: 'Company paid', enrolled: 78 },
    { id: 'BEN002', name: 'Dental Plan', type: 'Dental', coverage: 'Employee + dependents', provider: 'Delta Dental', cost: 'Company paid', enrolled: 65 },
    { id: 'BEN003', name: '401(k) Retirement', type: 'Financial', coverage: '6% company match', provider: 'Fidelity', cost: 'Matched', enrolled: 72 },
    { id: 'BEN004', name: 'Gym Membership', type: 'Wellness', coverage: '$50/month stipend', provider: 'Various', cost: 'Subsidized', enrolled: 34 },
    { id: 'BEN005', name: 'Life Insurance', type: 'Insurance', coverage: '2x annual salary', provider: 'MetLife', cost: 'Company paid', enrolled: 80 },
    { id: 'BEN006', name: 'Remote Work Stipend', type: 'Allowance', coverage: '$100/month', provider: 'N/A', cost: 'Company paid', enrolled: 45 },
  ],

  /* ?? Dashboard activity feed ?? */
  activities: [
    { text: 'Sarah Mitchell submitted a leave request for Jun 15–20', time: '2 hours ago' },
    { text: 'New candidate Alex Turner moved to Interview stage', time: '4 hours ago' },
    { text: 'May 2026 payroll processed for 78 employees', time: 'Yesterday' },
    { text: 'Cybersecurity Awareness training enrollment opened', time: 'Yesterday' },
    { text: 'Marcus Johnson marked absent for Jun 2', time: '2 days ago' },
  ],

  /* ?? Helper: get employee by ID ?? */
  getEmployee(id) {
    return this.employees.find(e => e.id === id);
  },

  getEmployeeName(id) {
    const emp = this.getEmployee(id);
    return emp ? `${emp.firstName} ${emp.lastName}` : 'Unknown';
  },

  getInitials(firstName, lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  },
};
