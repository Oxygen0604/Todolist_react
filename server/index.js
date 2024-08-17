const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3001;
const Database = require('better-sqlite3');
const path = require('path');
const db = new Database(path.resolve(__dirname, 'my-database.db'));


app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));

db.exec(`
  CREATE TABLE IF NOT EXISTS password (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT
  );
  CREATE TABLE IF NOT EXISTS deleteIndex (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT
  );
`);

app.get('/getPassword', (req, res) => {
  try {
    const rows = db.prepare('SELECT data FROM password ORDER BY id DESC').all();
    res.json(rows.map(row => JSON.parse(row.data)));
  } catch (err) {
    console.error('查询密码失败:', err);
    res.status(500).send('Server error');
  }
});

app.get('/getTasks', (req, res) => {
  try {
    const rows = db.prepare('SELECT data FROM tasks ORDER BY id DESC').all();
    res.json(rows.map(row => JSON.parse(row.data)));
  } catch (err) {
    console.error('查询任务失败:', err);
    res.status(500).send('Server error');
  }
});

app.get('/getIndex', (req, res) => {
  try {
    const rows = db.prepare('SELECT data FROM deleteIndex ORDER BY id DESC').all();
    res.json(rows.map(row => JSON.parse(row.data)));
  } catch (err) {
    console.error('查询索引失败:', err);
    res.status(500).send('Server error');
  }
});

app.post('/savePassword', (req, res) => {
  const data = JSON.stringify(req.body);

  try {
    db.prepare('INSERT INTO password (data) VALUES (?)').run(data);
    console.log('密码插入成功');
    res.status(200).send('Password saved successfully');
  } catch (err) {
    console.error('密码保存失败:', err);
    res.status(500).send('Server error');
  }
});

app.post('/saveIndex', (req, res) => {
  const data = JSON.stringify(req.body);

  try {
    db.prepare('INSERT INTO deleteIndex (data) VALUES (?)').run(data);
    console.log('索引插入成功');
    res.status(200).send('Index saved successfully');
  } catch (err) {
    console.error('索引保存失败:', err);
    res.status(500).send('Server error');
  }
});

app.post('/saveTasks', (req, res) => {
  const data = JSON.stringify(req.body);

  try {
    db.prepare('INSERT INTO tasks (data) VALUES (?)').run(data);
    console.log('任务插入成功');
    res.status(200).send('Tasks saved successfully');
  } catch (err) {
    console.error('任务保存失败:', err);
    res.status(500).send('Server error');
  }
});

app.listen(PORT, () => {
  console.log(`服务已启动，端口号：${PORT}`);
});
