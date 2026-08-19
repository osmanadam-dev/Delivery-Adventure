const gameState = { character: null, characterEmoji: null, restaurant: null, restaurantEmoji: null, items: {}, total: 0, eta: 25 };
const menus = {
    'Pizza Palace': [
        { id: 'pp1', name: 'Margherita Pizza', emoji: '🍕', price: 12.99, desc: 'Classic tomato & mozzarella' },
        { id: 'pp2', name: 'Pepperoni Feast', emoji: '🍕', price: 15.99, desc: 'Loaded with pepperoni' },
        { id: 'pp3', name: 'Veggie Supreme', emoji: '🥬', price: 14.99, desc: 'Fresh garden vegetables' },
        { id: 'pp4', name: 'Garlic Bread', emoji: '🥖', price: 5.99, desc: 'Buttery garlic goodness' }
    ],
    'Burger Barn': [
        { id: 'bb1', name: 'Classic Cheeseburger', emoji: '🍔', price: 10.99, desc: 'Beef patty with cheese' },
        { id: 'bb2', name: 'Double Bacon Burger', emoji: '🥓', price: 14.99, desc: 'Double the flavor' },
        { id: 'bb3', name: 'Crispy Fries', emoji: '🍟', price: 4.99, desc: 'Golden and crunchy' },
        { id: 'bb4', name: 'Milkshake', emoji: '🥤', price: 5.99, desc: 'Thick and creamy' }
    ],
    'Sushi Station': [
        { id: 'ss1', name: 'Salmon Roll Set', emoji: '🍣', price: 16.99, desc: 'Fresh salmon rolls' },
        { id: 'ss2', name: 'Tempura Platter', emoji: '🍤', price: 18.99, desc: 'Crispy tempura mix' },
        { id: 'ss3', name: 'Miso Soup', emoji: '🥣', price: 3.99, desc: 'Traditional miso' },
        { id: 'ss4', name: 'Green Tea', emoji: '🍵', price: 2.99, desc: 'Japanese green tea' }
    ],
    'Taco Town': [
        { id: 'tt1', name: 'Beef Tacos (3)', emoji: '🌮', price: 9.99, desc: 'Seasoned beef tacos' },
        { id: 'tt2', name: 'Chicken Burrito', emoji: '🌯', price: 11.99, desc: 'Stuffed with goodness' },
        { id: 'tt3', name: 'Nachos Supreme', emoji: '🧀', price: 8.99, desc: 'Loaded nachos' },
        { id: 'tt4', name: 'Churros', emoji: '🥨', price: 5.99, desc: 'Cinnamon sugar churros' }
    ],
    'Noodle Nook': [
        { id: 'nn1', name: 'Ramen Bowl', emoji: '🍜', price: 13.99, desc: 'Rich broth & noodles' },
        { id: 'nn2', name: 'Pad Thai', emoji: '🍝', price: 12.99, desc: 'Classic Thai noodles' },
        { id: 'nn3', name: 'Spring Rolls', emoji: '🥟', price: 6.99, desc: 'Crispy veggie rolls' },
        { id: 'nn4', name: 'Bubble Tea', emoji: '🧋', price: 5.99, desc: 'Tapioca pearl tea' }
    ],
    'Sweet Spot': [
        { id: 'sp1', name: 'Donut Box (6)', emoji: '🍩', price: 8.99, desc: 'Assorted flavors' },
        { id: 'sp2', name: 'Ice Cream Sundae', emoji: '🍨', price: 6.99, desc: 'Triple scoop delight' },
        { id: 'sp3', name: 'Chocolate Cake', emoji: '🍰', price: 7.99, desc: 'Rich chocolate layers' },
        { id: 'sp4', name: 'Fruit Smoothie', emoji: '🥤', price: 5.99, desc: 'Fresh fruit blend' }
    ]
};
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    try {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        switch (type) {
            case 'click': oscillator.frequency.value = 800; gainNode.gain.value = 0.1; oscillator.start(); oscillator.stop(audioCtx.currentTime + 0.1); break;
            case 'success': oscillator.frequency.value = 523; gainNode.gain.value = 0.15; oscillator.start(); oscillator.frequency.setValueAtTime (659, audioCtx.currentTime + 0.1); oscillator.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2); oscillator.stop(audioCtx. currentTime + 0.3); break;
            case 'deliver': oscillator.frequency.value = 400; gainNode.gain.value = 0.1; oscillator.start(); oscillator.frequency.
            linearRampToValueAtTime(600, audioCtx.currentTime + 0.2); oscillator.stop(audioCtx.currentTime + 0.3); break;
        }
    } catch (e) { }
}
function goToScreen(screenId) {
    playSound('click');
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    updateStepIndicator(screenId);
    window.scrollTo(0, 0);
}
function updateStepIndicator(screenId) {
    const steps = ['screen-intro', 'screen-character', 'screen-restaurant', 'screen-menu', 'screen-confirm', 'screen-tracking', 
'screen-delivery'];
    const currentIndex = steps.indexOf(screenId);
    const dots = document.querySelectorAll('.step-dot');
    dots.forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i < currentIndex) dot.classList.add('completed');
        if (i === currentIndex) dot.classList.add('active');
    });
}
function selectCharacter(card, name, emoji) {
    playSound('click');
    document.querySelectorAll('.character-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    gameState.character = name; gameState.characterEmoji = emoji;
    document.getElementById('btn-character-next').disabled = false;
    showToast(`${emoji} ${name} is ready to eat!`);
}
function selectRestaurant(card, name, emoji) {
    playSound('click');
    document.querySelectorAll('.restaurant-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    gameState.restaurant = name; gameState.restaurantEmoji = emoji;
    document.getElementById('btn-restaurant-next').disabled = false;
    showToast(`${emoji} ${name} selected!`);
}
function loadMenu() {
    playSound('click');
    const menuItems = menus[gameState.restaurant] || [];
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = '';
    menuItems.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.id = `item-${item.id}`;
        div.onclick = () => toggleItem(item);
        div.innerHTML = `<span class="menu-emoji">${item.emoji}</span><div class="menu-name">${item.name}</div><div class="menu-price">$${item.
price.toFixed(2)}</div><div class="menu-desc">${item.desc}</div><div class="quantity-control" onclick="event.stopPropagation()"><button 
class="qty-btn" onclick="changeQty('${item.id}', -1)">−</button><span class="qty-value" id="qty-${item.id}">0</span><button 
class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button></div>`;
        grid.appendChild(div);
    });
    document.getElementById('menu-title').textContent = `${gameState.restaurantEmoji} ${gameState.restaurant} Menu`;
    gameState.items = {};
    updateCart();
    goToScreen('screen-menu');
}
function toggleItem(item) { if (!gameState.items[item.id]) changeQty(item.id, 1); }
function changeQty(itemId, delta) {
    playSound('click');
    const item = menus[gameState.restaurant].find(i => i.id === itemId);
    if (!gameState.items[itemId]) gameState.items[itemId] = 0;
    gameState.items[itemId] += delta;
    if (gameState.items[itemId] < 0) gameState.items[itemId] = 0;
    if (gameState.items[itemId] === 0) delete gameState.items[itemId];
    document.getElementById(`qty-${itemId}`).textContent = gameState.items[itemId] || 0;
    const itemEl = document.getElementById(`item-${itemId}`);
    if (gameState.items[itemId] > 0) itemEl.classList.add('selected');
    else itemEl.classList.remove('selected');
    updateCart();
}
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    let total = 0, itemCount = 0, html = '';
    const menu = menus[gameState.restaurant] || [];
    for (const [itemId, qty] of Object.entries(gameState.items)) {
        if (qty > 0) {
            const item = menu.find(i => i.id === itemId);
            if (item) { total += item.price * qty; itemCount += qty; html += `<div class="cart-item"><span>${item.emoji} ${item.name} x${qty}</
span><span>$${(item.price * qty).toFixed(2)}</span></div>`; }
        }
    }
    cartItems.innerHTML = html || '<p style="text-align: center; color: rgba(255,255,255,0.5);">Your cart is empty</p>';
    document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
    gameState.total = total;
    cartSummary.style.display = itemCount > 0 ? 'block' : 'none';
    document.getElementById('btn-menu-next').disabled = itemCount === 0;
}
function placeOrder() {
    playSound('success');
    document.getElementById('confirm-character').textContent = `${gameState.characterEmoji} ${gameState.character}`;
    document.getElementById('confirm-restaurant').textContent = `${gameState.restaurantEmoji} ${gameState.restaurant}`;
    let itemNames = [];
    const menu = menus[gameState.restaurant] || [];
    for (const [itemId, qty] of Object.entries(gameState.items)) {
        const item = menu.find(i => i.id === itemId);
        if (item) itemNames.push(`${item.name} x${qty}`);
    }
    document.getElementById('confirm-items').textContent = itemNames.join(', ');
    document.getElementById('confirm-total').textContent = `$${gameState.total.toFixed(2)}`;
    document.getElementById('confirm-time').textContent = `${gameState.eta}-${gameState.eta + 10} min`;
    goToScreen('screen-confirm');
    setTimeout(() => {
        document.getElementById('prep-spinner').style.display = 'none';
        document.getElementById('prep-text').textContent = '✅ Your order is ready for delivery!';
        document.getElementById('prep-text').style.color = '#4ECDC4';
        document.getElementById('prep-text').style.fontWeight = '700';
        document.getElementById('confirm-buttons').style.display = 'flex';
        playSound('success');
    }, 3000);
}
function startDelivery() {
    playSound('click');
    goToScreen('screen-tracking');
    const bike = document.getElementById('delivery-bike');
    const progress = document.getElementById('progress-fill');
    const status = document.getElementById('tracking-status');
    const eta = document.getElementById('eta-display');
    const trackingButtons = document.getElementById('tracking-buttons');
    bike.classList.add('bouncing');
    const stages = [
        { progress: 0, status: '🍳 Preparing your order...', eta: 25 },
        { progress: 10, status: '👨‍🍳 Chef is cooking...', eta: 22 },
        { progress: 20, status: '✅ Order ready!', eta: 20 },
        { progress: 30, status: '🚲 Driver picked up your order', eta: 18 },
        { progress: 40, status: '🚴 On the way!', eta: 15 },
        { progress: 50, status: '🚴‍♂️ Cruising through traffic...', eta: 12 },
        { progress: 60, status: '🚲 Almost there!', eta: 8 },
        { progress: 70, status: '📍 In your neighborhood', eta: 5 },
        { progress: 80, status: '🏠 Approaching your door!', eta: 2 },
        { progress: 90, status: '🔔 Ring ring! Food is here!', eta: 0 },
        { progress: 100, status: '🎉 Delivered!', eta: 0 }
    ];
    let currentStage = 0;
    const interval = setInterval(() => {
        if (currentStage >= stages.length) {
            clearInterval(interval);
            bike.classList.remove('bouncing');
            trackingButtons.style.display = 'flex';
            playSound('success');
            return;
        }
        const stage = stages[currentStage];
        progress.style.width = stage.progress + '%';
        status.textContent = stage.status;
        eta.textContent = stage.eta + ':00';
        const bikePos = 10 + (stage.progress * 0.7);
        bike.style.left = bikePos + '%';
        if (stage.progress > 0) playSound('deliver');
        currentStage++;
    }, 1500);
}
function showDelivery() {
    playSound('success');
    goToScreen('screen-delivery');
    setTimeout(() => {
        document.getElementById('delivery-person').textContent = '🙋‍♂️';
        document.getElementById('food-bag').style.display = 'block';
        startConfetti();
    }, 1000);
    let receiptHtml = '';
    const menu = menus[gameState.restaurant] || [];
    for (const [itemId, qty] of Object.entries(gameState.items)) {
        const item = menu.find(i => i.id === itemId);
        if (item) receiptHtml += `<div class="receipt-line"><span>${item.name} x${qty}</span><span>$${(item.price * qty).toFixed(2)}</span></
div>`;
    }
    receiptHtml += `<div class="receipt-line"><span>Delivery Fee</span><span>$2.99</span></div><div class="receipt-line"><span>Tax</span><span>$$
{(gameState.total * 0.08).toFixed(2)}</span></div><div class="receipt-line receipt-total"><span>TOTAL</span><span>$${(gameState.total + 2.99 
+ gameState.total * 0.08).toFixed(2)}</span></div>`;
    document.getElementById('receipt-content').innerHTML = receiptHtml;
}
function rate(stars) {
    playSound('click');
    document.querySelectorAll('.star').forEach((star, i) => { if (i < stars) star.classList.add('active'); else star.classList.remove
('active'); });
    const messages = ['😢 We\'ll do better!', '😐 Thanks!', '😊 Good!', '😃 Great!', '🤩 Amazing!'];
    showToast(messages[stars - 1]);
}
function playAgain() {
    playSound('click');
    gameState.character = null; gameState.characterEmoji = null;
    gameState.restaurant = null; gameState.restaurantEmoji = null;
    gameState.items = {}; gameState.total = 0;
    document.querySelectorAll('.character-card, .restaurant-card, .menu-item').forEach(c => c.classList.remove('selected'));
    document.getElementById('btn-character-next').disabled = true;
    document.getElementById('btn-restaurant-next').disabled = true;
    document.getElementById('btn-menu-next').disabled = true;
    document.getElementById('prep-spinner').style.display = 'block';
    document.getElementById('prep-text').textContent = 'Chef is cooking your meal...';
    document.getElementById('prep-text').style.color = 'rgba(255,255,255,0.7)';
    document.getElementById('prep-text').style.fontWeight = '400';
    document.getElementById('confirm-buttons').style.display = 'none';
    document.getElementById('tracking-buttons').style.display = 'none';
    document.getElementById('delivery-person').textContent = '🛵';
    document.getElementById('food-bag').style.display = 'none';
    document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));
    stopConfetti();
    goToScreen('screen-intro');
}
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}
let confettiActive = false, confettiAnimationId = null;
function startConfetti() {
    confettiActive = true;
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colors = ['#FF6B35', '#F7C948', '#4ECDC4', '#FF6B9D', '#C44569', '#A8E6CF'];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5, h: Math.random() * 5 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2, speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360, rotationSpeed: Math.random() * 4 - 2
        });
    }
    function draw() {
        if (!confettiActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotationSpeed;
            if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
        });
        confettiAnimationId = requestAnimationFrame(draw);
    }
    draw();
}
function stopConfetti() {
    confettiActive = false;
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});