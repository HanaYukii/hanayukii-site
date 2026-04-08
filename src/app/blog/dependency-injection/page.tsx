import type { Metadata } from "next";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import Code from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "搞懂 Dependency Injection | 花雪 HanaYukii",
  description:
    "DI 常被講得很玄，但核心其實很單純：不要在業務邏輯裡自己 new 依賴。這篇用實例把邊界講清楚。",
  openGraph: {
    title: "搞懂 Dependency Injection",
    description:
      "DI 常被講得很玄，但核心其實很單純：不要在業務邏輯裡自己 new 依賴。",
    type: "article",
  },
};

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} className="mb-4 mt-12 text-2xl font-bold text-warm scroll-mt-20">
      {children}
    </h2>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 mt-8 text-lg font-bold">{children}</h3>;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-4 border-l-2 border-primary pl-4 text-text-muted italic">
      {children}
    </blockquote>
  );
}

export default function DependencyInjection() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <FadeIn>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-primary"
        >
          &larr; Back to Blog
        </Link>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            Design Pattern
          </span>
          <span className="rounded-full bg-sky/10 px-2.5 py-0.5 text-xs font-medium text-sky">
            Software Engineering
          </span>
          <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
            Testing
          </span>
        </div>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
          搞懂 Dependency Injection
        </h1>
        <p className="mb-8 text-text-muted">
          我自己比較不把 DI 當成某種架構信仰，而是把它當成一個很務實的問題：
          你的 business logic 到底有沒有被 DB、cache、HTTP client 這些東西綁死。
          這篇就從這個角度講。
        </p>
      </FadeIn>

      <FadeIn delay={0.1}>
        <nav className="mb-12 rounded-xl border border-border bg-surface/40 p-6 backdrop-blur-sm">
          <p className="mb-3 text-sm font-bold text-text-muted uppercase tracking-wider">
            如果你只想抓重點
          </p>
          <div className="space-y-2">
            {[
              { id: "item1", title: "DI 其實只是在處理依賴怎麼進來" },
              { id: "item2", title: "沒有 DI 時，test 為什麼會越寫越痛苦" },
              { id: "item3", title: "我最常用的做法：Constructor Injection" },
              { id: "item4", title: "再往下一層：用 abstraction 隔開實作" },
              { id: "item5", title: "不同語言其實差不多" },
              { id: "item6", title: "Container 什麼時候才需要" },
              { id: "item7", title: "DI 真正的回報通常在測試" },
              { id: "item8", title: "幾個很常見的反模式" },
            ].map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover"
              >
                <span className="text-text-muted mr-2">{i + 1}.</span>
                <code className="text-primary">{item.title}</code>
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      <div className="prose-custom space-y-2 text-text-muted leading-relaxed [&_strong]:text-text [&_code]:rounded [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_code]:text-sm">
        {/* ============ Item 1 ============ */}
        <FadeIn>
          <Heading id="item1">DI 其實只是在處理依賴怎麼進來</Heading>

          <p>
            Dependency Injection（DI）的核心概念只有一句話：
          </p>
          <Callout>
            <strong>不要自己建立 dependency，讓外部傳進來。</strong>
          </Callout>

          <p>
            當 class A 需要用到 class B 的功能時，A 不應該自己 <code>new B()</code>，
            而是由外部把 B 的 instance inject 到 A 裡面。
          </p>

          <SubHeading>什麼是耦合 Coupling？</SubHeading>
          <p>
            在討論 DI 之前，先理解它要解決的核心問題：<strong>耦合（Coupling）</strong>。
          </p>
          <p>
            Coupling 指的是兩個 module 之間的依賴程度。當 A 直接使用了 B 的 concrete implementation，
            A 就和 B coupled 了。Coupling 越高，代表：
          </p>
          <ul className="my-3 list-inside list-disc space-y-1 text-sm">
            <li><strong className="text-text">改一個就要改另一個</strong>：B 換了 API，A 也要跟著改</li>
            <li><strong className="text-text">無法單獨測試</strong>：要測 A，必須連 B 一起跑</li>
            <li><strong className="text-text">無法替換</strong>：想把 MySQL 換成 PostgreSQL？整個 A 要重寫</li>
            <li><strong className="text-text">變更擴散</strong>：一個小改動連鎖影響整個系統</li>
          </ul>

          <Code lang="cpp">{`// ❌ 高耦合：OrderService 自己 new 出 MySQL，綁死了
class OrderService {
 public:
  OrderService()
      : db_(new MySQLConnection("prod-db", 3306)) {}  // 寫死在 constructor 裡

  Order GetOrder(const std::string& id) {
    return db_->Query("SELECT * FROM orders WHERE id = " + id);
  }

 private:
  std::unique_ptr<MySQLConnection> db_;  // 只能是 MySQL，無法替換
};

// ✅ 低耦合：OrderService 不知道也不在乎背後是什麼 DB
class OrderService {
 public:
  explicit OrderService(std::unique_ptr<IDatabase> db)
      : db_(std::move(db)) {}  // 由外部決定傳什麼進來

  Order GetOrder(const std::string& id) {
    return db_->Query("SELECT * FROM orders WHERE id = " + id);
  }

 private:
  std::unique_ptr<IDatabase> db_;  // 任何實作 IDatabase 的都行
};

// 正式環境傳 MySQL
auto service = OrderService(std::make_unique<MySQLConnection>(...));
// 測試時傳 FakeDB
auto service = OrderService(std::make_unique<FakeDatabase>());`}</Code>

          <Callout>
            DI 的目標就是<strong>降低 coupling</strong>：讓模組之間只透過 abstraction 溝通，具體要用哪個 implementation 由外部決定。
          </Callout>

          <SubHeading>三種注入方式</SubHeading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">方式</th>
                  <th className="px-4 py-2 text-left font-semibold text-text">做法</th>
                  <th className="px-4 py-2 text-left font-semibold text-text">推薦度</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2"><strong>Constructor Injection</strong></td>
                  <td className="px-4 py-2">透過 constructor 傳入</td>
                  <td className="px-4 py-2 font-bold text-primary">最推薦</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Setter Injection</td>
                  <td className="px-4 py-2">透過 setter 方法傳入</td>
                  <td className="px-4 py-2">選用</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Interface Injection</td>
                  <td className="px-4 py-2">實作特定 injection interface</td>
                  <td className="px-4 py-2">少用</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* ============ Item 2 ============ */}
        <FadeIn>
          <Heading id="item2">沒有 DI 時，test 為什麼會越寫越痛苦</Heading>

          <p>
            來看一個最常見的問題：你的 service 直接建立 DB 連線，導致<strong>根本無法寫 unit test</strong>。
          </p>

          <SubHeading>訂單服務直接依賴 MySQL</SubHeading>
          <Code lang="rust">{`// ❌ 沒有 DI：OrderService 和 MySQL 完全綁死
struct OrderService {
    db: MySQLConnection,
}

impl OrderService {
    fn new() -> Self {
        // 自己建立依賴，問題的根源
        let db = MySQLConnection::connect("prod-db.internal", 3306, "orders")
            .expect("db connect failed");
        Self { db }
    }

    fn get_order(&self, id: &str) -> Result<Order> {
        let row = self.db.query("SELECT * FROM orders WHERE id = ?", &[id])?;
        Ok(self.map_to_order(row))
    }
}`}</Code>

          <SubHeading>這樣要怎麼寫 Unit Test？</SubHeading>
          <Code lang="rust">{`#[test]
fn test_get_order() {
    // 🔴 new() 裡面直接連 MySQL...
    // 你的 CI 根本沒有 MySQL
    // 就算有，每跑一次 test 要連 DB、seed data、清理...
    let service = OrderService::new(); // 💥 connection refused
    let order = service.get_order("123");
    assert!(order.is_ok());
}`}</Code>
          <p>
            這就是沒有 DI 的最大問題：business logic 和 infrastructure 綁死了，無法隔離測試。
          </p>

          <SubHeading>連鎖反應</SubHeading>
          <Code lang="rust">{`// 當 dependency 層層巢狀...
struct OrderService {
    db: MySQLConnection,
    cache: RedisClient,
    logger: FileLogger,
    emailer: SmtpClient,
    metrics: DatadogClient,
    // 這個 struct 知道太多 implementation detail
    // 改一個 config 就可能影響整個系統
}`}</Code>
          <Callout>
            當一個 struct 自己管理所有 dependency 的 lifetime，它的職責就已經超出 business logic 的範圍了。
          </Callout>
        </FadeIn>

        {/* ============ Item 3 ============ */}
        <FadeIn>
          <Heading id="item3">我最常用的做法：Constructor Injection</Heading>

          <SubHeading>改造：把依賴從外部傳入</SubHeading>
          <Code lang="rust">{`// ✅ Constructor Injection：依賴從外部傳入
struct OrderService<D: Database> {
    db: D,  // 不再自己建立，由外部決定
}

impl<D: Database> OrderService<D> {
    fn new(db: D) -> Self {
        Self { db }
    }

    fn get_order(&self, id: &str) -> Result<Order> {
        let row = self.db.query("SELECT * FROM orders WHERE id = ?", &[id])?;
        Ok(self.map_to_order(row))
    }
}

// 使用時，由外部決定注入什麼
let mysql = MySQLConnection::connect("prod-db.internal", 3306)?;
let service = OrderService::new(mysql);`}</Code>

          <SubHeading>Go 的做法</SubHeading>
          <Code lang="go">{`// Go 天生就適合 DI - 用 struct + interface
type OrderService struct {
    db Database  // 依賴是一個 interface
}

func NewOrderService(db Database) *OrderService {
    return &OrderService{db: db}
}

func (s *OrderService) GetOrder(ctx context.Context, id string) (*Order, error) {
    row, err := s.db.Query(ctx, "SELECT * FROM orders WHERE id = $1", id)
    if err != nil {
        return nil, fmt.Errorf("get order %s: %w", id, err)
    }
    return mapToOrder(row), nil
}`}</Code>

          <SubHeading>Python 的做法</SubHeading>
          <Code lang="python">{`# Python 用 type hint 明確宣告依賴
class OrderService:
    def __init__(self, db: Database) -> None:
        self._db = db

    def get_order(self, order_id: str) -> Order:
        row = self._db.query("SELECT * FROM orders WHERE id = %s", (order_id,))
        return self._map_to_order(row)

# 使用
db = PostgresConnection(host="prod-db.internal", port=5432)
order_service = OrderService(db)

# 測試時換成 fake
fake_db = InMemoryDatabase()
order_service = OrderService(fake_db)`}</Code>

          <SubHeading>C++ 的做法</SubHeading>
          <Code lang="cpp">{`// C++ 用 reference 或 unique_ptr 注入
class OrderService {
 public:
  // 用 unique_ptr 轉移所有權
  explicit OrderService(std::unique_ptr<IDatabase> db)
      : db_(std::move(db)) {}

  // 或用 reference（呼叫端負責 lifetime）
  explicit OrderService(IDatabase& db) : db_ref_(db) {}

  std::optional<Order> GetOrder(std::string_view id) {
    auto row = db_->Query("SELECT * FROM orders WHERE id = ?", id);
    return row ? MapToOrder(*row) : std::nullopt;
  }

 private:
  std::unique_ptr<IDatabase> db_;
};

// 使用
auto db = std::make_unique<MySQLConnection>("prod-db.internal", 3306);
OrderService service(std::move(db));`}</Code>

          <SubHeading>Constructor Injection 的好處</SubHeading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">好處</th>
                  <th className="px-4 py-2 text-left font-semibold text-text">說明</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-bold text-primary">Immutability</td>
                  <td className="px-4 py-2">Dependency 在 construction 時就確定，之後不會變</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-bold text-primary">Explicitness</td>
                  <td className="px-4 py-2">看 constructor 就知道這個 class 需要什麼</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2 font-bold text-primary">Testability</td>
                  <td className="px-4 py-2">傳入 mock / fake 就能做 unit test</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-bold text-primary">防 over-coupling</td>
                  <td className="px-4 py-2">constructor 參數太多？代表這個 class 做太多事了</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* ============ Item 4 ============ */}
        <FadeIn>
          <Heading id="item4">再往下一層：用 abstraction 隔開實作</Heading>

          <p>
            Constructor injection 解決了 construction 的問題，但如果 type 是具體的 <code>MySQLConnection</code>，
            你還是沒辦法替換成其他 implementation。解法是：<strong>depend on abstraction (interface)，而非 concrete type。</strong>
          </p>

          <SubHeading>Rust - 用 Trait 定義抽象</SubHeading>
          <Code lang="rust">{`// 定義抽象
trait Database {
    fn query(&self, sql: &str, params: &[&str]) -> Result<Vec<Row>>;
    fn execute(&self, sql: &str, params: &[&str]) -> Result<()>;
}

// MySQL 實作
struct MySQLDatabase {
    conn: MySQLConnection,
}

impl Database for MySQLDatabase {
    fn query(&self, sql: &str, params: &[&str]) -> Result<Vec<Row>> {
        self.conn.query(sql, params)
    }

    fn execute(&self, sql: &str, params: &[&str]) -> Result<()> {
        self.conn.execute(sql, params)
    }
}

// PostgreSQL 實作
struct PostgresDatabase {
    pool: PgPool,
}

impl Database for PostgresDatabase {
    fn query(&self, sql: &str, params: &[&str]) -> Result<Vec<Row>> {
        let result = self.pool.query(sql, params)?;
        Ok(result.rows)
    }

    fn execute(&self, sql: &str, params: &[&str]) -> Result<()> {
        self.pool.query(sql, params).map(|_| ())
    }
}

// OrderService 完全不知道背後是 MySQL 還是 PostgreSQL
struct OrderService<D: Database> {
    db: D,
}
// ... 業務邏輯`}</Code>

          <SubHeading>Go - 隱式介面的優勢</SubHeading>
          <Code lang="go">{`// Go 的 interface 是隱式實作 - 不需要 "implements" 關鍵字
type Database interface {
    Query(ctx context.Context, sql string, args ...any) ([]Row, error)
    Execute(ctx context.Context, sql string, args ...any) error
}

// MySQL 實作 - 自動滿足 Database interface
type MySQLDB struct {
    conn *sql.DB
}

func (m *MySQLDB) Query(ctx context.Context, sql string, args ...any) ([]Row, error) {
    rows, err := m.conn.QueryContext(ctx, sql, args...)
    if err != nil {
        return nil, err
    }
    defer rows.Close()
    return scanRows(rows)
}

func (m *MySQLDB) Execute(ctx context.Context, sql string, args ...any) error {
    _, err := m.conn.ExecContext(ctx, sql, args...)
    return err
}

// Consumer 只依賴 interface
type OrderService struct {
    db Database  // 不是 *MySQLDB，是 Database interface
}`}</Code>
          <Callout>
            Go 社群的慣例：<strong>在 consumer 端定義 interface</strong>，而非在 implementation 端。
            這讓 interface 只包含 consumer 真正需要的 method（Interface Segregation Principle）。
          </Callout>

          <SubHeading>C++ - 純虛函數做抽象</SubHeading>
          <Code lang="cpp">{`// C++ 用純虛函數定義 interface
class IDatabase {
 public:
  virtual ~IDatabase() = default;
  virtual std::vector<Row> Query(std::string_view sql) = 0;
  virtual void Execute(std::string_view sql) = 0;
};

class MySQLDatabase : public IDatabase {
 public:
  explicit MySQLDatabase(const Config& config)
      : conn_(mysql_connect(config)) {}

  std::vector<Row> Query(std::string_view sql) override {
    return conn_.query(std::string(sql));
  }

  void Execute(std::string_view sql) override {
    conn_.execute(std::string(sql));
  }

 private:
  MySQLConn conn_;
};

// 注意 virtual call 的成本：每次呼叫多一次 vtable 查表
// 在 HFT 等超低延遲場景，可考慮用 template（編譯期多型）替代`}</Code>

          <SubHeading>C++ - Template 做編譯期 DI（零成本抽象）</SubHeading>
          <Code lang="cpp">{`// 用 template 避免 virtual call 開銷
template <typename DB>
class OrderService {
 public:
  explicit OrderService(DB& db) : db_(db) {}

  std::optional<Order> GetOrder(std::string_view id) {
    auto row = db_.Query("SELECT * FROM orders WHERE id = ?");
    return row.empty() ? std::nullopt : std::optional(MapToOrder(row[0]));
  }

 private:
  DB& db_;
};

// 使用 - 編譯器直接 inline，沒有 virtual call
MySQLDatabase mysql(config);
OrderService service(mysql);  // OrderService<MySQLDatabase>

// 測試 - 換成 MockDB，也是零成本
MockDatabase mock_db;
OrderService test_service(mock_db);  // OrderService<MockDatabase>`}</Code>
          <Callout>
            C++ 的 template DI = compile-time polymorphism。沒有 vtable overhead，但代價是每種 type 都會生成一份 code（code bloat）。
            大多數應用用 virtual 就好，HFT / 遊戲引擎等 hot path 才需要考慮 template。
          </Callout>
        </FadeIn>

        {/* ============ Item 5 ============ */}
        <FadeIn>
          <Heading id="item5">不同語言其實差不多</Heading>

          <SubHeading>Example 1：HTTP Handler + 多層依賴（Go）</SubHeading>
          <Code lang="go">{`// 實際專案中，依賴通常是多層的
type UserHandler struct {
    userService *UserService
}

type UserService struct {
    repo   UserRepository
    hasher PasswordHasher
    mailer EmailSender
}

type UserRepository interface {
    FindByEmail(ctx context.Context, email string) (*User, error)
    Create(ctx context.Context, user *User) error
}

type PasswordHasher interface {
    Hash(password string) (string, error)
    Compare(hashed, password string) error
}

type EmailSender interface {
    Send(ctx context.Context, to, subject, body string) error
}

// 在 main() 或 wire 裡組裝整棵 dependency tree
func main() {
    db := postgres.NewDB(os.Getenv("DATABASE_URL"))
    repo := postgres.NewUserRepo(db)
    hasher := bcrypt.NewHasher(12)
    mailer := ses.NewClient(os.Getenv("AWS_REGION"))

    userService := NewUserService(repo, hasher, mailer)
    userHandler := NewUserHandler(userService)

    http.Handle("/users", userHandler)
    http.ListenAndServe(":8080", nil)
}`}</Code>

          <SubHeading>Example 2：Rust 的 Trait Object 多層注入</SubHeading>
          <Code lang="rust">{`// Rust 用 trait object 或泛型來做多層依賴注入
trait UserRepository: Send + Sync {
    fn find_by_email(&self, email: &str) -> Result<Option<User>>;
    fn create(&self, user: &User) -> Result<()>;
}

trait PasswordHasher: Send + Sync {
    fn hash(&self, password: &str) -> Result<String>;
    fn verify(&self, hashed: &str, password: &str) -> Result<bool>;
}

struct AuthService {
    user_repo: Box<dyn UserRepository>,
    hasher: Box<dyn PasswordHasher>,
    jwt_secret: String,
}

impl AuthService {
    fn new(
        user_repo: Box<dyn UserRepository>,
        hasher: Box<dyn PasswordHasher>,
        jwt_secret: String,
    ) -> Self {
        Self { user_repo, hasher, jwt_secret }
    }

    fn login(&self, email: &str, password: &str) -> Result<String> {
        let user = self.user_repo.find_by_email(email)?
            .ok_or(AuthError::NotFound)?;
        if !self.hasher.verify(&user.password_hash, password)? {
            return Err(AuthError::InvalidPassword.into());
        }
        Ok(jwt::encode(&self.jwt_secret, &Claims { sub: user.id }))
    }
}

// 在 main 組裝
fn main() {
    let repo = Box::new(PgUserRepo::new(&db_pool));
    let hasher = Box::new(BcryptHasher::new(12));
    let auth = AuthService::new(repo, hasher, secret);
}`}</Code>

          <SubHeading>Example 3：FastAPI 的依賴注入（Python）</SubHeading>
          <Code lang="python">{`# FastAPI 內建 DI 系統 - 用 Depends()
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

app = FastAPI()

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user_service(db: Session = Depends(get_db)) -> UserService:
    return UserService(db)

@app.get("/users/{user_id}")
async def get_user(
    user_id: int,
    service: UserService = Depends(get_user_service),
):
    return service.get_user(user_id)

# 測試時 override 依賴
def get_test_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = get_test_db`}</Code>

          <SubHeading>Example 4：Rust Actix-web 的 Data 注入</SubHeading>
          <Code lang="rust">{`// Actix-web 用 App::app_data() 注入共享狀態
use actix_web::{web, App, HttpServer, HttpResponse};

struct AppState {
    user_service: Arc<dyn UserService>,
    order_service: Arc<dyn OrderService>,
}

async fn get_user(
    state: web::Data<AppState>,
    path: web::Path<String>,
) -> HttpResponse {
    match state.user_service.get_user(&path).await {
        Ok(user) => HttpResponse::Ok().json(user),
        Err(_) => HttpResponse::NotFound().finish(),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let db = Arc::new(PgPool::connect("postgres://...").await?);
    let user_svc: Arc<dyn UserService> = Arc::new(PgUserService::new(db.clone()));
    let order_svc: Arc<dyn OrderService> = Arc::new(PgOrderService::new(db));

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(AppState {
                user_service: user_svc.clone(),
                order_service: order_svc.clone(),
            }))
            .route("/users/{id}", web::get().to(get_user))
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}`}</Code>
          <Callout>
            DI 的概念無處不在。Actix-web 的 <code>app_data</code>、Axum 的 <code>Extension</code>、React Context、Angular Service 底層都是依賴注入。
          </Callout>
        </FadeIn>

        {/* ============ Item 6 ============ */}
        <FadeIn>
          <Heading id="item6">Container 什麼時候才需要</Heading>

          <p>
            當專案變大，手動組裝 dependency tree 會變得很痛苦。DI container 幫你自動 resolve 和管理 dependency。
          </p>

          <SubHeading>手動 vs Container</SubHeading>
          <Code lang="go">{`// ❌ 手動組裝 - 專案大了會寫到崩潰
func main() {
    config := LoadConfig()
    logger := NewLogger(config.LogLevel)
    db := NewPostgresDB(config.DatabaseURL)
    cache := NewRedisClient(config.RedisURL)
    userRepo := NewUserRepo(db)
    orderRepo := NewOrderRepo(db)
    productRepo := NewProductRepo(db)
    userService := NewUserService(userRepo, logger)
    orderService := NewOrderService(orderRepo, userService, cache, logger)
    productService := NewProductService(productRepo, cache, logger)
    paymentGateway := NewStripeClient(config.StripeKey)
    checkoutService := NewCheckoutService(orderService, productService, paymentGateway, logger)
    // ... 繼續下去
}`}</Code>

          <SubHeading>Google Wire（Go）- 編譯期 DI</SubHeading>
          <Code lang="go">{`// wire.go - 只需要告訴 Wire 有哪些 provider
//go:build wireinject

package main

import "github.com/google/wire"

func InitializeApp(cfg Config) (*App, error) {
    wire.Build(
        NewLogger,
        NewPostgresDB,
        NewRedisClient,
        NewUserRepo,
        NewOrderRepo,
        NewUserService,
        NewOrderService,
        NewCheckoutService,
        NewApp,
    )
    return nil, nil  // Wire 會自動生成這裡的實作
}

// wire 命令會生成 wire_gen.go，裡面是完整的手動組裝程式碼
// 好處：沒有 runtime reflection，出錯在 compile time 就知道`}</Code>

          <SubHeading>各語言的 DI 工具比較</SubHeading>
          <div className="my-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-surface/60">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-text">語言</th>
                  <th className="px-4 py-2 text-left font-semibold text-text">工具</th>
                  <th className="px-4 py-2 text-left font-semibold text-text">類型</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Go</td>
                  <td className="px-4 py-2"><code>google/wire</code></td>
                  <td className="px-4 py-2">編譯期 code generation</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Go</td>
                  <td className="px-4 py-2"><code>uber-go/fx</code></td>
                  <td className="px-4 py-2">Runtime reflection</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Rust</td>
                  <td className="px-4 py-2"><code>shaku</code></td>
                  <td className="px-4 py-2">Derive macro + module</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Rust</td>
                  <td className="px-4 py-2"><code>手動 trait object</code></td>
                  <td className="px-4 py-2">慣用做法，無需框架</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Python</td>
                  <td className="px-4 py-2"><code>FastAPI Depends</code></td>
                  <td className="px-4 py-2">Function-based</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Python</td>
                  <td className="px-4 py-2"><code>dependency-injector</code></td>
                  <td className="px-4 py-2">Container pattern</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-2">Java / Kotlin</td>
                  <td className="px-4 py-2"><code>Spring / Dagger</code></td>
                  <td className="px-4 py-2">Annotation / code gen</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">C++</td>
                  <td className="px-4 py-2"><code>Boost.DI</code></td>
                  <td className="px-4 py-2">Template metaprogramming</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* ============ Item 7 ============ */}
        <FadeIn>
          <Heading id="item7">DI 真正的回報通常在測試</Heading>

          <p>
            在 Item 2 我們已經看過沒有 DI 時，unit test 根本寫不了。
            現在來看有了 DI 之後，測試可以多簡潔。
          </p>

          <SubHeading>Rust：注入 Fake 實作做 Unit Test</SubHeading>
          <Code lang="rust">{`// ✅ 注入 fake 實作 - 快、穩定、隔離
struct FakeDatabase {
    data: HashMap<String, Order>,
}

impl FakeDatabase {
    fn new() -> Self {
        Self { data: HashMap::new() }
    }

    fn seed(&mut self, id: &str, order: Order) {
        self.data.insert(id.to_string(), order);
    }
}

impl Database for FakeDatabase {
    fn query(&self, _sql: &str, params: &[&str]) -> Result<Vec<Row>> {
        let id = params.first().unwrap();
        match self.data.get(*id) {
            Some(order) => Ok(vec![order_to_row(order)]),
            None => Ok(vec![]),
        }
    }

    fn execute(&self, _sql: &str, _params: &[&str]) -> Result<()> {
        Ok(())
    }
}

#[test]
fn test_get_order_found() {
    let mut fake_db = FakeDatabase::new();
    fake_db.seed("order-123", Order { id: "order-123".into(), total: 99.99, status: "paid".into() });

    let service = OrderService::new(fake_db);
    let order = service.get_order("order-123").unwrap();

    assert_eq!(order.unwrap().total, 99.99);
}

#[test]
fn test_get_order_not_found() {
    let fake_db = FakeDatabase::new();
    let service = OrderService::new(fake_db);

    let order = service.get_order("nonexistent").unwrap();
    assert!(order.is_none());
}`}</Code>

          <SubHeading>Go 的 Table-Driven Test + DI</SubHeading>
          <Code lang="go">{`type mockDB struct {
    orders map[string]*Order
    err    error
}

func (m *mockDB) Query(ctx context.Context, sql string, args ...any) ([]Row, error) {
    if m.err != nil {
        return nil, m.err
    }
    id := args[0].(string)
    if order, ok := m.orders[id]; ok {
        return []Row{orderToRow(order)}, nil
    }
    return nil, nil
}

func (m *mockDB) Execute(ctx context.Context, sql string, args ...any) error {
    return m.err
}

func TestGetOrder(t *testing.T) {
    tests := []struct {
        name    string
        db      Database
        orderID string
        want    *Order
        wantErr bool
    }{
        {
            name: "found",
            db: &mockDB{orders: map[string]*Order{
                "123": {ID: "123", Total: 99.99},
            }},
            orderID: "123",
            want:    &Order{ID: "123", Total: 99.99},
        },
        {
            name:    "not found",
            db:      &mockDB{orders: map[string]*Order{}},
            orderID: "999",
            want:    nil,
        },
        {
            name:    "db error",
            db:      &mockDB{err: errors.New("connection refused")},
            orderID: "123",
            wantErr: true,
        },
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            svc := NewOrderService(tt.db)
            got, err := svc.GetOrder(context.Background(), tt.orderID)
            if (err != nil) != tt.wantErr {
                t.Errorf("error = %v, wantErr %v", err, tt.wantErr)
            }
            if !reflect.DeepEqual(got, tt.want) {
                t.Errorf("got %v, want %v", got, tt.want)
            }
        })
    }
}`}</Code>
          <Callout>
            DI 讓測試速度從秒降到毫秒。
            不需要真的 DB、不需要網路、不需要 file system，所有外部 dependency 都能被替換。
          </Callout>
        </FadeIn>

        {/* ============ Item 8 ============ */}
        <FadeIn>
          <Heading id="item8">幾個很常見的反模式</Heading>

          <SubHeading>Anti-pattern 1：Service Locator</SubHeading>
          <Code lang="rust">{`// ❌ Service Locator - 看起來像 DI，其實不是
struct OrderService {
    db: Box<dyn Database>,
}

impl OrderService {
    fn new() -> Self {
        // 從全域容器「拉」依賴 - 隱藏了真正的依賴關係
        let db = SERVICE_LOCATOR.get::<Box<dyn Database>>("Database")
            .expect("Database not registered");
        Self { db }
    }
}

// 問題：
// 1. 看 struct fields 和 new() 不知道真正需要什麼
// 2. 忘記註冊 → runtime 才 panic
// 3. 測試時要 mock 全域狀態（Rust 裡更痛苦）`}</Code>

          <SubHeading>Anti-pattern 2：Over-abstraction</SubHeading>
          <Code lang="rust">{`// ❌ 不是所有東西都需要 trait
trait MathUtils {
    fn add(&self, a: f64, b: f64) -> f64;
    fn multiply(&self, a: f64, b: f64) -> f64;
}

struct MathUtilsImpl;

impl MathUtils for MathUtilsImpl {
    fn add(&self, a: f64, b: f64) -> f64 { a + b }
    fn multiply(&self, a: f64, b: f64) -> f64 { a * b }
}

// ✅ 純函數直接用，不需要 DI
fn add(a: f64, b: f64) -> f64 { a + b }`}</Code>

          <SubHeading>什麼時候該用 DI？</SubHeading>
          <div className="my-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <p className="mb-2 text-sm font-bold text-text">適合 DI</p>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>外部資源（DB、API、File System）</li>
                <li>跨邊界溝通（HTTP client、Message Queue）</li>
                <li>有多種實作的策略（Payment gateway）</li>
                <li>需要在測試中替換的行為</li>
                <li>有生命週期管理需求（Connection pool）</li>
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-surface/40 p-4">
              <p className="mb-2 text-sm font-bold text-text">不需要 DI</p>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>純函數 / 工具函數</li>
                <li>Value Object / DTO</li>
                <li>只有一種實作且不會變的東西</li>
                <li>語言內建的標準庫功能</li>
                <li>簡單的 config 值（直接傳參數）</li>
              </ul>
            </div>
          </div>

          <SubHeading>Anti-pattern 3：Constructor 參數爆炸</SubHeading>
          <Code lang="rust">{`// ❌ 參數太多 = 這個 struct 做太多事了
struct GodService {
    db: Box<dyn Database>,
    cache: Box<dyn Cache>,
    logger: Box<dyn Logger>,
    mailer: Box<dyn EmailSender>,
    sms: Box<dyn SmsSender>,
    metrics: Box<dyn MetricsClient>,
    feature_flags: Box<dyn FeatureFlagService>,
    storage: Box<dyn FileStorage>,
}

// ✅ 拆分職責
struct NotificationService {
    mailer: Box<dyn EmailSender>,
    sms: Box<dyn SmsSender>,
}

struct OrderService {
    db: Box<dyn Database>,
    notifications: NotificationService,
    logger: Box<dyn Logger>,
}`}</Code>
          <Callout>
            Constructor 超過 3-4 個參數時，通常代表違反了 Single Responsibility Principle。
            DI 會自然地暴露設計問題 - 這也是它的優點。
          </Callout>
        </FadeIn>

        {/* ============ Summary ============ */}
        <FadeIn>
          <Heading id="summary">最後我自己的判斷方式</Heading>
          <div className="space-y-4">
            <p>
              如果一個 class 會碰 DB、queue、cache、第三方 API 這種跨邊界的東西，
              我通常都會先把 dependency 從外部傳進來。不是因為 DI 比較潮，
              而是因為這樣測試比較好寫，改實作時也比較不痛。
            </p>
            <p>
              反過來說，如果只是純函數、value object，或根本沒有替換需求的東西，
              我通常不會硬抽 interface。DI 解的是耦合，不是拿來增加樣板。
            </p>
            <ul className="list-inside list-disc space-y-2 text-sm">
              <li>先用 constructor injection，通常就夠了。</li>
              <li>只對真正跨邊界、會替換、會影響測試的東西做 abstraction。</li>
              <li>看到 constructor 參數開始爆長時，先懷疑設計，不要先怪 DI。</li>
            </ul>
          </div>
        </FadeIn>
      </div>
    </article>
  );
}
