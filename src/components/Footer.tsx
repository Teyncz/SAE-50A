import React from "react";
import Image from "next/image";

export const Footer = () => {

    interface LinkItem {
        text: string;
        href: string;
    }

    interface LinkListType {
        title: string;
        list: LinkItem[];
    }

    interface LinkListProps {
        data: LinkListType;
    }

    const LinkList = ({data}: LinkListProps) => {

        return (
            <div className={"text-center sm:text-left"}>
                <p className={"text-[18px] text-white font-[500]"}>{data.title}</p>
                <ul className={"flex flex-col gap-[5px] mt-[10px]"}>
                    {data.list.map((item: LinkItem, index: number) => {
                        return (
                            <li key={index}>
                                <a className={"text-[15px] font-[300] text-white"} key={index}
                                   href={item.href}>{item.text}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }

    const footerLinksList: LinkListType[] = [
        {
            'title': 'Documentation',
            'list': [
                {
                    'text': 'Commencer',
                    'href': '/docs/quickstart',
                },
                {
                    'text': 'Intégrations',
                    'href': '#',
                },
                {
                    'text': 'Exemples',
                    'href': '#',
                }
            ]
        },
        {
            'title': 'Ressources',
            'list': [
                {
                    'text': 'Changelog',
                    'href': '#',
                },
                {
                    'text': 'Tarification',
                    'href': '/#pricing',
                },
                {
                    'text': 'RGPD',
                    'href': '/legal',
                }
            ]
        },
        {
            'title': 'Informations légales',
            'list': [
                {
                    'text': 'Mentions légales',
                    'href': '/legal/mentions',
                },
                {
                    'text': 'Conditions générales',
                    'href': '/legal/conditions',
                },
                {
                    'text': 'Préférences de cookie',
                    'href': '/legal/cookies',
                },
                {
                    'text': 'Politique de confidentialité',
                    'href': '/legal/confidentiality',
                }
            ]
        },

    ]

    return (
        <footer
            className={"mx-[15px] mb-[15px] mt-[150px] sm:mx-[30px] sm:mb-[30px] bg-black-primary px-[60px] lg:px-[100px] py-[50px] rounded-[10px] gap-[10px] flex flex-col"}>
            <div className={"flex flex-col bp860:flex-row gap-[15px] justify-between"}>
                <div className={"flex gap-[15px] sm:items-end flex-col bp390:flex-row"}>
                    <a href={"/"} draggable={false}>
                        <h1 className={"font-kamerik text-[32px] font-[600] text-white"}>Ski Picker</h1>
                    </a>
                    <span className={"h-[16px] w-[1px] flex bg-white hidden bp390:flex"}></span>
                </div>
            </div>
            <span className={"flex w-full h-[1px] bg-[#FFFFFF85] my-[20px]"}></span>
            <div className={"flex flex-col bp860:flex-row justify-between items-center overflow-hidden gap-[50px]"}>
                <div
                    className={"flex items-center sm:items-start flex-col sm:flex-row max-w-[600px] justify-between gap-[20px] w-full"}>
                    {footerLinksList.map((item: LinkListType, index: number) => {
                        return (
                            <LinkList key={index} data={item}/>
                        )
                    })}
                </div>
            </div>
            <span className={"flex w-full h-[1px] bg-[#FFFFFF85] my-[20px]"}></span>
            <p className={"font-[400] text-[11px] sm:text-[15px] text-white text-center"}>2026 © Ski Picker. Tous
                droits réservés.</p>
        </footer>
    )
}