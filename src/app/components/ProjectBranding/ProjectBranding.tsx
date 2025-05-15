import styles from './ProjectBranding.module.css';

export default function ProjectBranding() {
  return (
    <div className={styles.projectName}>
      <span className={styles.projectNameProd}>Prod</span>
      <span className={styles.projectNameUibo}>-UIBO</span>
    </div>
  );
}