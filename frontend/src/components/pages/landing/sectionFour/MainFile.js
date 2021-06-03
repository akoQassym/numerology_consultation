import React, { useEffect, useState } from "react";
import s from "./MainFile.module.scss";
import Loading from "../../loading/Loading";

const SectionFour = () => {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (products === null) {
            getProductsInfo();
        }
    })

    async function getProductsInfo() {
        fetch("/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            });
    }


    if (loading) {
        return <Loading />
    }

    return (
        <div className={s.structure}>
            <p className={s.header}>Выберите самый подходящий пакет</p>
            <p className={s.about}>Выберите тот пакет, который подходит именно вам. Вы сможете купить другой в любое время.</p>
            <div className={s.content}>
                {products.map(product => (
                    <div class={s.priceDiv} key={product.id}>
                        <ul class={s.price}>
                            <li class={s.priceDivHeader}>{product.productName}</li>
                            <li class={s.priceTag}>$ {product.price}</li>
                            <li class={s.present}>10GB Storage</li>
                            <li class={s.absent}>10 Emails</li>
                            <li class={s.absent}>10 Domains</li>
                            <li class={s.absent}>1GB Bandwidth</li>
                            <a href="/register"><li className={s.buyBtn}>Купить</li></a>
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionFour;