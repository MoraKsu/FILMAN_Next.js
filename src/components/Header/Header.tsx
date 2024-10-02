"use client";

import { useMemo, useState, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.scss';
import Submenu from './Submenu';

const Header: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submenuContent, setSubmenuContent] = useState<{ title: string; links: string[] }[]>([]);
  const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

  const submenuData = useMemo(
    () => ({
      all: [
        { title: 'Жанры', links: ['Комедия', 'Драма', 'Фантастика', 'Детектив', 'Анимэ'] },
        { title: 'По годам', links: ['2024', '2023', '2022', '2021', '2020'] },
        { title: 'По странам', links: ['США', 'Россия', 'Корея', 'Турция', 'Великобритания'] },
        { title: 'Телеканал', links: ['Кинопоиск', 'IVI', 'KION', 'Окко', 'Start'] },
      ],
      films: [
        { title: 'Жанры', links: ['Комедия', 'Драма', 'Фантастика', 'Детектив', 'Анимэ'] },
        { title: 'По годам', links: ['2024', '2023', '2022', '2021', '2020'] },
        { title: 'По странам', links: ['США', 'Россия', 'Корея', 'Турция', 'Великобритания'] },
        { title: 'Телеканал', links: ['Кинопоиск', 'IVI', 'KION', 'Окко', 'Start'] },
      ],
      cartoons: [
        { title: 'Жанры', links: ['Комедия', 'Драма', 'Фантастика', 'Детектив', 'Анимэ'] },
        { title: 'По годам', links: ['2024', '2023', '2022', '2021', '2020'] },
        { title: 'По странам', links: ['США', 'Россия', 'Корея', 'Турция', 'Великобритания'] },
        { title: 'Телеканал', links: ['Кинопоиск', 'IVI', 'KION', 'Окко', 'Start'] },
      ],
      series: [
        { title: 'Жанры', links: ['Комедия', 'Драма', 'Фантастика', 'Детектив', 'Анимэ'] },
        { title: 'По годам', links: ['2024', '2023', '2022', '2021', '2020'] },
        { title: 'По странам', links: ['США', 'Россия', 'Корея', 'Турция', 'Великобритания'] },
        { title: 'Телеканал', links: ['Кинопоиск', 'IVI', 'KION', 'Окко', 'Start'] },
      ],
    }),
    []
  );

  const handleNavItemMouseEnter = (dropdownId: keyof typeof submenuData) => {
    setSubmenuContent(submenuData[dropdownId]);
    setIsSubmenuVisible(true);
  };

  const handleNavItemMouseLeave = () => {
    setTimeout(() => {
      setIsSubmenuVisible(false);
    }, 300);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add search logic here
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/icons/logo.png" className={styles.headerLogo} alt="Логотип" width={157} height={70} />
      </Link>
      <nav className={styles.headerNav}>
        <ul className={styles.headerNavItem}>
          <li className={styles.headerNavItems}>
            <Link href="#" onMouseEnter={() => handleNavItemMouseEnter('all')} onMouseLeave={handleNavItemMouseLeave}>
              Все
            </Link>
          </li>
          <li className={styles.headerNavItems}>
            <Link href="#" onMouseEnter={() => handleNavItemMouseEnter('films')} onMouseLeave={handleNavItemMouseLeave}>
              Фильмы
            </Link>
          </li>
          <li className={styles.headerNavItems}>
            <Link href="#" onMouseEnter={() => handleNavItemMouseEnter('cartoons')} onMouseLeave={handleNavItemMouseLeave}>
              Мультфильмы
            </Link>
          </li>
          <li className={styles.headerNavItems}>
            <Link href="#" onMouseEnter={() => handleNavItemMouseEnter('series')} onMouseLeave={handleNavItemMouseLeave}>
              Сериалы
            </Link>
          </li>
        </ul>
        <form className={styles.headerSearchBox} onSubmit={handleSearchSubmit}>
          <input
            className={styles.headerSearchInput}
            type="text"
            placeholder="Поиск"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.headerSearchButton} type="submit">
            <Image src="/icons/Search.svg" className={styles.headerSearchImg} alt="Поиск" width={24} height={24} />
          </button>
        </form>
      </nav>
      {isSubmenuVisible && <Submenu submenuContent={submenuContent} />}
    </header>
  );
};

export default Header;