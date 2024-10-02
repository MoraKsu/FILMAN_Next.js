import { FC } from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

interface SubmenuProps {
  submenuContent: {
    title: string;
    links: string[];
  }[];
}

const Submenu: FC<SubmenuProps> = ({ submenuContent }) => {
  return (
    <div className={styles.submenu}>
      <div className={styles.submenuDropdownContent}>
        {submenuContent.map((item, index) => (
          <div className={styles.submenuDropdownColumn} key={index}>
            <Link href="#" className={styles.submenuDropdownLinkBold}>
              {item.title}
            </Link>
            <div className={styles.submenuDropdownSubmenu}>
              {item.links.map((link, linkIndex) => (
                <Link href="#" className={styles.submenuDropdownLink} key={linkIndex}>
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Submenu;