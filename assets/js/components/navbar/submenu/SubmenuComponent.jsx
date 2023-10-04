import React from "react";

export default function SubmenuComponent({ content }) {

    const items = content.items.map((item, index) =>
        <div className="submenu_content">
            <div className="submenu_content_image">
                <a href={item.link}>
                    <img src={item.image} />
                </a>
            </div>
            <div className="submenu_content_text">
                <a href={item.link}>
                    <div className="submenu_content_title">
                        <h2>{item.title}</h2>
                    </div>
                </a>
                <div className="submenu_content_description">
                    <p>{item.description}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="submenu_container">
            <div className="submenu_content_container">
                {items}
            </div>
            <div className="submenu_title_container">
                <h1>{content.title}</h1>
            </div>
        </div>
    );
}