import { auth, db } from '../firebase-config.js';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import {
  collection, addDoc, getDocs, deleteDoc, doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// ensure only admin
onAuthStateChanged(auth, async user => {
  if (!user) location.href = 'login.html';
  // you can verify admin uid from Firestore admins collection
});

// Generic list render
async function renderList(colName, containerId) {
  const snap = await getDocs(collection(db, colName));
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  snap.forEach(d => {
    const div = document.createElement('div');
    div.innerHTML = `${d.data().name} <button data-id="${d.id}" class="delete">🗑️</button>`;
    container.appendChild(div);
  });
}

// Add handlers
document.getElementById('btnAddCat').onclick = async () => {
  const name = document.getElementById('catName').value.trim();
  if (name) await addDoc(collection(db, 'categories'), { name });
  renderList('categories', 'catList');
};

document.getElementById('btnCity').onclick = async () => {
  const name = document.getElementById('cityName').value.trim();
  if (name) await addDoc(collection(db, 'cities'), { name });
  renderList('cities', 'locationList');
};

document.getElementById('btnArea').onclick = async () => {
  const name = document.getElementById('areaName').value.trim();
  if (name) await addDoc(collection(db, 'areas'), { name });
  renderList('areas', 'locationList');
};

// Delegated delete
document.getElementById('locationList').addEventListener('click', async e => {
  const id = e.target.dataset.id;
  if (!id) return;

  const parentId = e.target.closest('div').parentElement.id;
  let colName = '';
  if (parentId === 'catList') colName = 'categories';
  else if (parentId === 'locationList') colName = 'cities'; // Or handle by checking context

  await deleteDoc(doc(db, colName, id));
  renderList('categories', 'catList');
  renderList('cities', 'locationList');
  renderList('areas', 'locationList');
});

