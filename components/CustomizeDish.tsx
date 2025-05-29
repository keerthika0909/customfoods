// components/CustomizeDish.tsx
'use client';

import { useState, FormEvent } from 'react';
import styles from './CustomizeDish.module.css';

const VEGETABLES = ['Bell Pepper','Ginger','Mushroom','Leek','Cauliflower','Okra','Beans','Corn'];
const PROTEINS   = ['Mutton','Chicken','Fish','Prawns','Eggs'];
const HEALTH     = ['Thyroid','Diabetes','Heart','Chronic'];
const SPICE      = ['Mild','Medium','Spicy'];

export default function CustomizeDish() {
  const [selectedVeg, setSelectedVeg]   = useState<string[]>([]);
  const [selectedProt, setSelectedProt] = useState<string[]>([]);
  const [health, setHealth]             = useState<string>(HEALTH[0]);
  const [spice, setSpice]               = useState<string>(SPICE[0]);
  const [recipe, setRecipe]             = useState<string>('');
  const [ordered, setOrdered]           = useState<boolean>(false);

  const toggle = (item: string, list: string[], setter: (v: string[]) => void) => {
    setter(list.includes(item)
      ? list.filter(x => x !== item)
      : [...list, item]);
  };

  const generate = () => {
    const all = [...selectedVeg, ...selectedProt];
    if (!all.length) {
      setRecipe('Please select at least one ingredient.');
      return;
    }
    let txt = `* Ingredients: ${all.join(', ')}\n`;
    txt += `* Health Condition: ${health}\n`;
    txt += `* Spice Level: ${spice}\n\n`;
    txt += `Recipe:\n`;
    txt += `1. Wash & chop ${all.join(', ')}.\n`;
    txt += `2. Heat oil, add spices for "${spice}" level.\n`;
    txt += `3. Add ingredients, sauté till done.\n`;
    txt += `4. Serve hot for your ${health}-friendly meal.`;
    setRecipe(txt);
    setOrdered(false);
  };

  const order = () => {
    if (!recipe || recipe.startsWith('Please')) return;
    setOrdered(true);
  };

  return (
    <div className={styles.container}>
      {/* === Hero Header === */}
      <div className={styles.hero}>
        <h1>🍲 Customize Your Dish</h1>
        <p>Your personalized healthy meal, just for you!</p>
      </div>

      {/* === Controls === */}
      <div className={styles.controls}>
        {/* Vegetables & Non-Veg */}
        <div className={styles.row}>
          <fieldset>
            <legend>Select Vegetables:</legend>
            {VEGETABLES.map(v => (
              <label key={v} className={styles.pill}>
                <input
                  type="checkbox"
                  checked={selectedVeg.includes(v)}
                  onChange={() => toggle(v, selectedVeg, setSelectedVeg)}
                />
                {v}
              </label>
            ))}
          </fieldset>
          <fieldset>
            <legend>Select Non-Veg Items:</legend>
            {PROTEINS.map(p => (
              <label key={p} className={styles.pill}>
                <input
                  type="checkbox"
                  checked={selectedProt.includes(p)}
                  onChange={() => toggle(p, selectedProt, setSelectedProt)}
                />
                {p}
              </label>
            ))}
          </fieldset>
        </div>

        {/* Health & Spice */}
        <div className={styles.row}>
          <div>
            <label>
              Select Your Health condition
              <select value={health} onChange={e => setHealth(e.target.value)}>
                {HEALTH.map(h => <option key={h}>{h}</option>)}
              </select>
            </label>
          </div>
          <div>
            <label>
              Spice level
              <select value={spice} onChange={e => setSpice(e.target.value)}>
                {SPICE.map(s => <option key={s}>{s}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* === Buttons === */}
      <div className={styles.buttons}>
        <button className={styles.generate} onClick={generate}>
          Generate Dish
        </button>
        <button
          className={styles.order}
          onClick={order}
          disabled={!recipe || recipe.startsWith('Please')}
        >
          Order
        </button>
      </div>

      {/* === Recipe Output === */}
      {recipe && (
        <pre className={styles.recipe}>
          {recipe}
          {ordered && '\n\n✅ Your order is placed!'}
        </pre>
      )}
    </div>
  );
}
