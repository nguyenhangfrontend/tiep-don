import Services from './Services';
import ServicesGroupLv1 from './ServicesGroupLv1';
import ServicesGroupLv2 from './ServicesGroupLv2';
import ServicesGroupLv3 from './ServicesGroupLv3';
import Uom from './Uom';
import Zones from './Zones';
import Hospital from './Hospital';
const DB_NAME = 'emr-app';
const DB_VERSION = 5;

class IndexDB {
  constructor() {
    this.db = null;
  }

  open = callBack => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = e => {
      const db = e.currentTarget.result;
      Services.onupgradeneeded(db);
      ServicesGroupLv1.onupgradeneeded(db);
      ServicesGroupLv2.onupgradeneeded(db);
      ServicesGroupLv3.onupgradeneeded(db);
      Uom.onupgradeneeded(db);
      Zones.onupgradeneeded(db);
      Hospital.onupgradeneeded(db);
    };

    request.onerror = e => {};

    request.onsuccess = e => {
      const db = e.currentTarget.result;

      callBack(true);
      Services.onsuccess(db);
      ServicesGroupLv1.onsuccess(db);
      ServicesGroupLv2.onsuccess(db);
      ServicesGroupLv3.onsuccess(db);
      Uom.onsuccess(db);
      Services.onsuccess(db);
      Zones.onsuccess(db);
      Hospital.onsuccess(db);
    };
  };
}

export default new IndexDB();
