class Tangerine {
  constructor(dbName, version) {
    this.dbName = dbName;
    this.dbVersion = version;
    this.db = null;
  }

  // 데이터베이스 초기화 및 열기
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      // 데이터베이스 업그레이드가 필요한 경우 여기서 처리
      request.onupgradeneeded = event => {
        this.db = event.target.result;
        
        // 'notes' 객체 스토어 생성
        if (!this.db.objectStoreNames.contains('notes')) {
          this.db.createObjectStore('notes', { keyPath: 'id', autoIncrement: true });
        }
        
        // 'users' 객체 스토어와 'email' 인덱스 생성
        if (!this.db.objectStoreNames.contains('users')) {
          const userStore = this.db.createObjectStore('users', { keyPath: 'userId', autoIncrement: true });
          userStore.createIndex('email', 'email', { unique: true });
        }
      };

      request.onsuccess = event => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = event => {
        reject(`Database error: ${event.target.error}`);
      };
    });
  }

  // 특정 스토어에 대한 참조를 얻음
  getStore(storeName, mode) {
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }

  // 데이터 추가
  async add(storeName, item) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.add(item);

      request.onsuccess = () => resolve(request.result);
      request.onerror = event => reject(`Add item failed: ${event.target.error}`);
    });
  }

  // 데이터 검색
  async get(storeName, key) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readonly');
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result);
      request.onerror = event => reject(`Get item failed: ${event.target.error}`);
    });
  }

  // 데이터 업데이트
  async update(storeName, item) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.put(item);

      request.onsuccess = () => resolve();
      request.onerror = event => reject(`Update item failed: ${event.target.error}`);
    });
  }

  // 데이터 삭제
  async delete(storeName, key) {
    return new Promise((resolve, reject) => {
      const store = this.getStore(storeName, 'readwrite');
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = event => reject(`Delete item failed: ${event.target.error}`);
    });
  }
