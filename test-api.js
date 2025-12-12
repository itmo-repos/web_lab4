(async () => {
    const BASE = "http://127.0.0.1:46702/lab4/api";

    function log(title, data) {
        console.log(title);
        console.log(data);
    }

    async function req(method, path, body=null, token=null) {
        const opt = {
            method,
            headers: { "Content-Type": "application/json" }
        };
        if (body) opt.body = JSON.stringify(body);
        if (token) opt.headers["Authorization"] = "Bearer " + token;

        const res = await fetch(BASE + path, opt);
        const text = await res.text();
        let json;
        try { json = JSON.parse(text); } catch { json = text; }
        return { status: res.status, body: json };
    }

    const username = "user" + Math.floor(Math.random() * 10000);
    const password = "pass123";

    let access, refresh;

    console.log("=== ТЕСТИРОВАНИЕ AUTH API ===");

    // 1) Регистрация – успех
    let r = await req("POST", "/auth/register", { username, password });
    log("Регистрация нового пользователя", r);

    // 2) Повторная регистрация – 409
    r = await req("POST", "/auth/register", { username, password });
    log("Повторная регистрация (ожидается 409)", r);

    // 3) Логин – успех
    r = await req("POST", "/auth/login", { username, password });
    log("Логин", r);

    if (r.status === 200) {
        access = r.body.accessToken;
        refresh = r.body.refreshToken;
    }

    // 4) Логин с неправильным паролем
    r = await req("POST", "/auth/login", { username, password: "wrong" });
    log("Логин с неверным паролем (401)", r);

    // === /results ===
    console.log("=== ТЕСТИРОВАНИЕ /results ===");

    // 5) без токена
    r = await req("GET", "/results");
    log("GET /results без токена (401)", r);

    // 6) с токеном
    r = await req("GET", "/results", null, access);
    log("GET /results с токеном", r);

    // 7) refresh
    r = await req("POST", "/auth/refresh", { refreshToken: refresh });
    log("Refresh токена", r);

    if (r.status === 200) {
        access = r.body.accessToken;
        refresh = r.body.refreshToken;
    }

    // === /points ===
    console.log("=== ТЕСТИРОВАНИЕ /points ===");

    // 8) Очистка всех точек
    r = await req("DELETE", "/points/clear-all", null, access);
    log("Очистка всех точек", r);

    // 9) Попытка добавления точки без токена
    r = await req("POST", "/points/add-new", { x: 1, y: 1, r: 1 });
    log("Добавление точки без токена (401)", r);

    // 10) Попытка добавления неверной точки
    r = await req("POST", "/points/add-new", { x: 999, y: 999, r: 1 }, access);
    log("Добавление некорректной точки (400)", r);

    // 11) Добавление 5 корректных точек
    const points = [
        { x: 1, y: 1, r: 2 },
        { x: -1, y: 0.5, r: 3 },
        { x: 0, y: -1, r: 2 },
        { x: 1.5, y: -0.5, r: 2 },
        { x: -1.2, y: -1, r: 3 }
    ];

    for (let p of points) {
        let resAdd = await req("POST", "/points/add-new", p, access);
        log("Добавление точки " + JSON.stringify(p), resAdd);
    }

    // 12) Получение всех точек
    r = await req("GET", "/points/get-all", null, access);
    log("Получение всех точек", r);

    // 13) Logout
    r = await req("POST", "/auth/logout", { refreshToken: refresh });
    log("Logout", r);

    // 14) Попытка refresh после logout
    r = await req("POST", "/auth/refresh", { refreshToken: refresh });
    log("Refresh после logout (ожидается 401)", r);

    console.log("=== ТЕСТ ЗАВЕРШЁН ===");
})();
