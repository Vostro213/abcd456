// ===============================
// Login & Show Password
// ===============================
function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const emailError = document.getElementById("emailError");
    const passError = document.getElementById("passError");
    emailError.innerText = "";
    passError.innerText = "";

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email) { emailError.innerText = "يرجى إدخال البريد الإلكتروني"; return; }
    if (!emailPattern.test(email)) { emailError.innerText = "البريد الإلكتروني غير صحيح"; return; }
    if (!password) { passError.innerText = "يرجى إدخال كلمة المرور"; return; }
    if (password.length < 4) { passError.innerText = "كلمة المرور ضعيفة"; return; }

    alert("تم تسجيل الدخول بنجاح");
    smoothNavigate("dashboard.html");
}

// ===============================
// Dark Mode Toggle
// ===============================
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

// حفظ الوضع عند إعادة تحميل الصفحة
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
}

// ===============================
// Dashboard Navigation
// ===============================
function goToDashboard() { smoothNavigate("dashboard.html"); }
function goToAccounting() { smoothNavigate("accounting.html"); }
function goToSuppliers() { smoothNavigate("suppliers.html"); }
function goToLegal() { smoothNavigate("legal.html"); }
function goToSupport() { smoothNavigate("support.html"); }
function goToAnalysis() { smoothNavigate("analysis.html"); }

// ===============================
// Services Navigation
// ===============================
function openService(serviceName) {
    const pages = {
        accounting: "accounting.html",
        suppliers: "suppliers.html",
        legal: "legal.html",
        support: "support.html",
        market: "service.html?service=market",
        project: "service.html?service=project",
        finance: "service.html?service=finance",
        stats: "service.html?service=stats",
        balance: "service.html?service=balance"
    };
    smoothNavigate(pages[serviceName] || "service.html");
}

// ===============================
// Services Page Dynamic Content
// ===============================
if (window.location.pathname.includes("service.html")) {
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");
    const title = document.getElementById("serviceTitle");
    const desc = document.getElementById("serviceDescription");

    const content = {
        accounting: ["الملف المحاسبي", "فتح الملف المحاسبي، متابعة الحسابات، إدارة الفواتير والمعاملات المالية للشركة."],
        suppliers: ["نافذة الموردين", "نافذة للتواصل مع الموردين والشركات في المجالات الاقتصادية، الفلاحية، والاستشفائية."],
        legal: ["الملحق القانوني", "ملحق قانوني لجميع التساؤلات حول الحالات الاقتصادية والقانونية."],
        support: ["مركز الاستشارات", "تضم هذه النافذة متخصصين ومستشارين اقتصاديين وقانونيين لتقديم الدعم والمشورة."],
        market: ["دراسة السوق", "تحليل السوق، العرض والطلب والمنافسين لتحديد الفرص الاستثمارية."],
        project: ["إدارة المشاريع", "تنظيم المشاريع، توزيع المهام، التخطيط لتحقيق أهداف المشروع بنجاح."],
        finance: ["التحليل المالي", "تحليل الأرباح والخسائر والتكاليف لتقييم الأداء المالي للمشاريع."],
        stats: ["الإحصائيات", "عرض البيانات والأرقام لتحليل القرارات الاقتصادية بدقة."],
        balance: ["ميزان المراجعة", "عرض المجاميع والأرصدة أونلاين لمتابعة الأصول والخصوم وحساب النتائج."]
    };

    if (content[service]) {
        title.innerText = content[service][0];
        desc.innerText = content[service][1];
    } else {
        title.innerText = "الخدمات الاقتصادية";
        desc.innerText = "اختر خدمة لعرض التفاصيل.";
    }
}

// ===============================
// Alerts Toggle
// ===============================
function showAlerts() {
    const alertsBox = document.getElementById("alertsBox");
    if (alertsBox) alertsBox.classList.toggle("hidden");
}

// ===============================
// Profile Menu
// ===============================
function toggleProfileMenu() {
    const menu = document.getElementById("profileMenu");
    menu.classList.toggle("hidden");
}

function logout() {
    alert("تم تسجيل الخروج");
    smoothNavigate("index.html");
}

// اغلاق قائمة البروفايل عند الضغط خارجها
document.addEventListener("click", function(e) {
    const profile = document.querySelector(".user-profile");
    const menu = document.getElementById("profileMenu");
    if (menu && !profile.contains(e.target)) menu.classList.add("hidden");
});

// ===============================
// Sidebar Active Item
// ===============================
document.querySelectorAll(".sidebar-menu li").forEach(item => {
    item.addEventListener("click", function () {
        document.querySelectorAll(".sidebar-menu li").forEach(li => li.classList.remove("active"));
        this.classList.add("active");
    });
});

// ===============================
// Smooth Page Navigation
// ===============================
function smoothNavigate(url) {
    document.body.style.transition = "opacity 0.3s ease";
    document.body.style.opacity = 0;
    setTimeout(() => window.location.href = url, 300);
}

window.addEventListener('DOMContentLoaded', () => document.body.style.opacity = 1);
// ===============================
// Show Password
// ===============================


// ===============================
// Animated Text (English/Arabic)
// ===============================
const texts = ["Economic Mediator", "الوسيط الاقتصادي"];
let index = 0;
const textEl = document.getElementById("textAnimation");

function animateText() {
    textEl.style.opacity = 0;
    setTimeout(() => {
        textEl.innerText = texts[index];
        textEl.style.opacity = 1;
        index = (index + 1) % texts.length;
    }, 500);
}

setInterval(animateText, 2500);
// ===============================
// Invoices Management
// ===============================
let invoices = JSON.parse(localStorage.getItem('invoices')) || [
    { id: 1, client: 'شركة النور', amount: 15000, date: '2024-06-10', status: 'مدفوعة' },
    { id: 2, client: 'مؤسسة السلام', amount: 22000, date: '2024-06-12', status: 'قيد الانتظار' }
];

function loadInvoices() {
    const tbody = document.getElementById('invoice-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    invoices.forEach(invoice => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${invoice.id.toString().padStart(3,'0')}</td>
            <td>${invoice.client}</td>
            <td>${invoice.amount} دج</td>
            <td>${invoice.date}</td>
            <td><span class="status ${invoice.status === 'مدفوعة' ? 'paid' : 'pending'}">${invoice.status}</span></td>
            <td>
                <button class="edit-btn" onclick="editInvoice(${invoice.id})">تحرير</button>
                <button class="delete-btn" onclick="deleteInvoice(${invoice.id})">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function showAddInvoiceForm() {
    document.getElementById('add-invoice-form').style.display = 'block';
}

function hideAddInvoiceForm() {
    document.getElementById('add-invoice-form').style.display = 'none';
    document.getElementById('invoice-client').value = '';
    document.getElementById('invoice-amount').value = '';
    document.getElementById('invoice-date').value = '';
    document.getElementById('invoice-status').value = 'مدفوعة';
}

function addInvoice() {
    const client = document.getElementById('invoice-client').value.trim();
    const amount = parseFloat(document.getElementById('invoice-amount').value);
    const date = document.getElementById('invoice-date').value;
    const status = document.getElementById('invoice-status').value;

    if (!client || isNaN(amount) || !date) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const newId = invoices.length > 0 ? Math.max(...invoices.map(i => i.id)) + 1 : 1;
    const newInvoice = { id: newId, client, amount, date, status };
    invoices.push(newInvoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));
    loadInvoices();
    hideAddInvoiceForm();
    alert('تم إضافة الفاتورة بنجاح');
}

function editInvoice(id) {
    const invoice = invoices.find(i => i.id === id);
    if (invoice) {
        document.getElementById('invoice-client').value = invoice.client;
        document.getElementById('invoice-amount').value = invoice.amount;
        document.getElementById('invoice-date').value = invoice.date;
        document.getElementById('invoice-status').value = invoice.status;
        showAddInvoiceForm();
        // Change button to update
        const addBtn = document.querySelector('#add-invoice-form button:first-of-type');
        addBtn.textContent = 'تحديث';
        addBtn.onclick = () => updateInvoice(id);
    }
}

function updateInvoice(id) {
    const client = document.getElementById('invoice-client').value.trim();
    const amount = parseFloat(document.getElementById('invoice-amount').value);
    const date = document.getElementById('invoice-date').value;
    const status = document.getElementById('invoice-status').value;

    if (!client || isNaN(amount) || !date) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const invoice = invoices.find(i => i.id === id);
    if (invoice) {
        invoice.client = client;
        invoice.amount = amount;
        invoice.date = date;
        invoice.status = status;
        localStorage.setItem('invoices', JSON.stringify(invoices));
        loadInvoices();
        hideAddInvoiceForm();
        // Reset button
        const addBtn = document.querySelector('#add-invoice-form button:first-of-type');
        addBtn.textContent = 'إضافة';
        addBtn.onclick = addInvoice;
        alert('تم تحديث الفاتورة بنجاح');
    }
}

function deleteInvoice(id) {
    if (confirm('هل أنت متأكد من حذف هذه الفاتورة؟')) {
        invoices = invoices.filter(i => i.id !== id);
        localStorage.setItem('invoices', JSON.stringify(invoices));
        loadInvoices();
    }
}

function filterInvoices() {
    const query = document.getElementById('invoice-search').value.toLowerCase();
    const statusFilter = document.getElementById('invoice-status-filter').value;
    const tbody = document.getElementById('invoice-body');
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const status = row.cells[4].textContent;
        const matchesQuery = text.includes(query);
        const matchesStatus = !statusFilter || status === statusFilter;
        row.style.display = matchesQuery && matchesStatus ? '' : 'none';
    });
}

function exportInvoicesToCSV() {
    const csvContent = "data:text/csv;charset=utf-8,"
        + "رقم الفاتورة,العميل,المبلغ,التاريخ,الحالة\n"
        + invoices.map(i => `${i.id},"${i.client}",${i.amount},"${i.date}","${i.status}"`).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "invoices.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Load invoices on page load
if (window.location.pathname.includes('accounting.html')) {
    document.addEventListener('DOMContentLoaded', loadInvoices);
}

// Load legal content on page load
if (window.location.pathname.includes('legal.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const user = JSON.parse(localStorage.getItem('user')) || { name: 'اسم المستخدم', email: 'email@example.com' };
        document.getElementById('userName').textContent = user.name;
        document.getElementById('userEmail').textContent = user.email;
        updateBadge();
    });
}

// ===============================
// Suppliers Management
// ===============================
let suppliers = JSON.parse(localStorage.getItem('suppliers')) || [
    { id: 1, name: 'شركة الإخلاص', phone: '0550123456', product: 'مواد غذائية', status: 'نشط', location: 'تلمسان - الجزائر' },
    { id: 2, name: 'مؤسسة النور', phone: '0660558899', product: 'معدات', status: 'غير نشط', location: 'وهران - الجزائر' }
];

function loadSuppliers() {
    const tbody = document.querySelector('.suppliers-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    suppliers.forEach(supplier => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${supplier.id.toString().padStart(2,'0')}</td>
            <td>${supplier.name}</td>
            <td>${supplier.phone}</td>
            <td>${supplier.product}</td>
            <td class="${supplier.status === 'نشط' ? 'paid' : 'pending'}">${supplier.status}</td>
            <td>
                <button class="edit-btn" onclick="editSupplier(${supplier.id})">تحرير</button>
                <button class="delete-btn" onclick="deleteSupplier(${supplier.id})">حذف</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    // Update example card if suppliers exist
    if (suppliers.length > 0) {
        const latest = suppliers[suppliers.length - 1];
        document.getElementById('card-name').textContent = latest.name;
        document.getElementById('card-phone').textContent = latest.phone;
        document.getElementById('card-product').textContent = latest.product;
        document.getElementById('card-location').textContent = latest.location;
        document.getElementById('supplier-card').style.display = 'flex';
    } else {
        document.getElementById('supplier-card').style.display = 'none';
    }
}

function showAddSupplierForm() {
    document.getElementById('add-supplier-form').style.display = 'block';
}

function hideAddSupplierForm() {
    document.getElementById('add-supplier-form').style.display = 'none';
    document.getElementById('supplier-name').value = '';
    document.getElementById('supplier-phone').value = '';
    document.getElementById('supplier-product').value = '';
    document.getElementById('supplier-location').value = '';
}

function addSupplier() {
    const name = document.getElementById('supplier-name').value.trim();
    const phone = document.getElementById('supplier-phone').value.trim();
    const product = document.getElementById('supplier-product').value.trim();
    const location = document.getElementById('supplier-location').value.trim();

    if (!name || !phone || !product || !location) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const newId = suppliers.length > 0 ? Math.max(...suppliers.map(s => s.id)) + 1 : 1;
    const newSupplier = {
        id: newId,
        name,
        phone,
        product,
        status: 'نشط',
        location
    };

    suppliers.push(newSupplier);
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    loadSuppliers();
    hideAddSupplierForm();
    alert('تم إضافة المورد بنجاح');
}

function deleteSupplier(id) {
    if (confirm('هل أنت متأكد من حذف هذا المورد؟')) {
        suppliers = suppliers.filter(s => s.id !== id);
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        loadSuppliers();
    }
}

// Load suppliers on page load
if (window.location.pathname.includes('suppliers.html')) {
    document.addEventListener('DOMContentLoaded', loadSuppliers);
}

// Dashboard Updates
if (window.location.pathname.includes('dashboard.html')) {
    document.addEventListener('DOMContentLoaded', updateDashboard);
}

function updateDashboard() {
    // Update suppliers count
    const suppliersCount = suppliers.length;
    const suppliersEl = document.getElementById('suppliers-count');
    if (suppliersEl) suppliersEl.textContent = `${suppliersCount} مورد`;

    // Update accounting count (assuming invoices are stored similarly)
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    const accountingEl = document.getElementById('accounting-count');
    if (accountingEl) accountingEl.textContent = `${invoices.length} فاتورة`;

    // Load chart
    loadSuppliersChart();

    // Update badge
    updateBadge();

    // Load user profile
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'اسم المستخدم', email: 'email@example.com' };
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
}

function loadSuppliersChart() {
    const ctx = document.getElementById('suppliersChart');
    if (!ctx) return;

    const active = suppliers.filter(s => s.status === 'نشط').length;
    const inactive = suppliers.filter(s => s.status === 'غير نشط').length;

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['نشط', 'غير نشط'],
            datasets: [{
                data: [active, inactive],
                backgroundColor: ['#4caf50', '#f44336']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'حالة الموردين'
                }
            }
        }
    });
}

function addAlert() {
    const newAlert = prompt('أدخل نص الإشعار الجديد:');
    if (newAlert) {
        const alertsList = document.getElementById('alerts-list');
        const p = document.createElement('p');
        p.innerHTML = `<i class="fas fa-bell"></i> ${newAlert}`;
        alertsList.appendChild(p);
        updateBadge();
    }
}

function updateBadge() {
    const badge = document.querySelector('.badge');
    const alerts = document.querySelectorAll('#alerts-list p').length;
    if (badge) badge.textContent = alerts;
}

function showProfileModal() {
    document.getElementById('profileModal').style.display = 'flex';
    // Load current data
    const user = JSON.parse(localStorage.getItem('user')) || { name: 'اسم المستخدم', email: 'email@example.com' };
    document.getElementById('profile-name').value = user.name;
    document.getElementById('profile-email').value = user.email;
}

function closeProfileModal() {
    document.getElementById('profileModal').style.display = 'none';
}

function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const email = document.getElementById('profile-email').value;
    const user = { name, email };
    localStorage.setItem('user', JSON.stringify(user));
    document.getElementById('userName').textContent = name;
    document.getElementById('userEmail').textContent = email;
    closeProfileModal();
    alert('تم حفظ الملف الشخصي');
}

function viewSupplierDetails(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        document.getElementById('modal-name').textContent = supplier.name;
        document.getElementById('modal-phone').textContent = supplier.phone;
        document.getElementById('modal-product').textContent = supplier.product;
        document.getElementById('modal-location').textContent = supplier.location;
        document.getElementById('modal-status').textContent = supplier.status;
        document.getElementById('supplier-modal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('supplier-modal').style.display = 'none';
}

function editSupplier(id) {
    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        document.getElementById('supplier-name').value = supplier.name;
        document.getElementById('supplier-phone').value = supplier.phone;
        document.getElementById('supplier-product').value = supplier.product;
        document.getElementById('supplier-location').value = supplier.location;
        showAddSupplierForm();
        // Change button to update
        const addBtn = document.querySelector('#add-supplier-form button:first-of-type');
        addBtn.textContent = 'تحديث';
        addBtn.onclick = () => updateSupplier(id);
    }
}

function updateSupplier(id) {
    const name = document.getElementById('supplier-name').value.trim();
    const phone = document.getElementById('supplier-phone').value.trim();
    const product = document.getElementById('supplier-product').value.trim();
    const location = document.getElementById('supplier-location').value.trim();

    if (!name || !phone || !product || !location) {
        alert('يرجى ملء جميع الحقول');
        return;
    }

    const supplier = suppliers.find(s => s.id === id);
    if (supplier) {
        supplier.name = name;
        supplier.phone = phone;
        supplier.product = product;
        supplier.location = location;
        localStorage.setItem('suppliers', JSON.stringify(suppliers));
        loadSuppliers();
        hideAddSupplierForm();
        // Reset button
        const addBtn = document.querySelector('#add-supplier-form button:first-of-type');
        addBtn.textContent = 'إضافة';
        addBtn.onclick = addSupplier;
        alert('تم تحديث المورد بنجاح');
    }
}

function filterSuppliers() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('status-filter').value;
    const tbody = document.querySelector('.suppliers-table tbody');
    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const status = row.cells[4].textContent;
        const matchesQuery = text.includes(query);
        const matchesStatus = !statusFilter || status === statusFilter;
        row.style.display = matchesQuery && matchesStatus ? '' : 'none';
    });
}

function filterByStatus() {
    filterSuppliers(); // Reuse the same function
}

function viewLatestSupplier() {
    if (suppliers.length > 0) {
        viewSupplierDetails(suppliers[suppliers.length - 1].id);
    }
}