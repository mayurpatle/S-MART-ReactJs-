import React ,{useEffect, useState} from 'react'
import styles from '../styles/Home.module.css'
const Whatsapp = () => {
  const [whatsappLink, setWhatsappLink] = useState('');

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const link = isMobile
      ? 'https://api.whatsapp.com/send?phone=+917620154681&text=Intrested%20in%20visiting%20the%20shop%20for%20buying.'
      : 'https://web.whatsapp.com/send?phone=+917620154681&text=Intrested%20in%20visiting%20the%20shop%20for%20buying.';
    setWhatsappLink(link);
  }, []);
  return (
    <>
    <div>
        <div className={styles.wlogo}>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
          <img alt="Whatsapp" src="https://img.shields.io/badge/Whatsapp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" />
        </a>
        </div>
    </div>
    {/* create  a   bot   */}
    
    </>
  )
}

export default Whatsapp