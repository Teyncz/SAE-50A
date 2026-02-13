import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const categories = ['Piste', 'Poudreuse', 'Freestyle', 'All-Mountain', 'Freeride'];

    for (const name of categories) {
        const existing = await prisma.categories.findFirst({ where: { name } });
        if (!existing) {
            await prisma.categories.create({ data: { name } });
        }
    }

    const brands = ['Armada', 'Atomic', 'Blackcrows', 'Black Diamond', 'Dynastar', 'Elan', 'Faction', 'Fischer', 'Head', 'K2', 'Line', 'Nordica', 'Rossignol', 'Salomon', 'Scott', 'Völkl'];
    for (const name of brands) {
        const existing = await prisma.brand.findFirst({ where: { name } });
        if (!existing) {
            await prisma.brand.create({ data: { name } });
        }
    }

    const colors = [
        {
            name: 'Rouge',
            hexaCode: '#e64e4e',
        },
        {
            name: 'Bleu',
            hexaCode: '#3981da',
        },
        {
            name: 'Vert',
            hexaCode: '#74e474',
        },
        {
            name: 'Jaune',
            hexaCode: '#ecec67',
        },
        {
            name: 'Noir',
            hexaCode: '#191919',
        },
        {
            name: 'Blanc',
            hexaCode: '#FFFFFF',
        },
        {
            name: 'Gris',
            hexaCode: '#b5b5b5',
        },
        {
            name: 'Orange',
            hexaCode: '#d59833',
        },
        {
            name: 'Violet',
            hexaCode: '#754275',
        },
        {
            name: 'Rose',
            hexaCode: '#e3a0ef',
        },
    ]
    for (const name of colors) {
        const existing = await prisma.colors.findFirst({ where: { name: name.name } });
        if (!existing) {
            await prisma.colors.create({ data: { name: name.name, hexaCode: name.hexaCode } });
        }
    }

    const saisons = ['2023-2024', '2024-2025', '2025-2026'];
    for (const label of saisons) {
        const existing = await prisma.saisons.findFirst({ where: { label } });
        if (!existing) {
            await prisma.saisons.create({ data: { label : label, active : false } });
        }
    }



}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        console.log("Seeding database...")
        await prisma.$disconnect()
    })