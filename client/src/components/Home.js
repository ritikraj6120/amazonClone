import React from "react";
import { useEffect } from "react";
import { fetchItems } from "../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Home.css";
import Product from "./Product";
const Home = () => {
    const dispatch = useDispatch();
    const itemsState = useSelector((state) => state.fetchItems);
    useEffect(() => {
        dispatch(fetchItems());
    }, []);

    return (
        <>
            {itemsState.loading === true ? (
                <div>wait loading</div>
            ) : (
                <div className="home">
                    <div className="home__container">
                        <img
                            className="home__image"
                            src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
                        />

                        <div className="home__row">
                            <div className="container-fluid div-7 mt-5 mb-5">
                                <div className="row">
                                    {itemsState.items.map((data) => {
                                        return (
                                            <div className="col-sm" key={data._id}>
                                                <Product
                                                    key={data._id}
                                                    data={data}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default Home;
