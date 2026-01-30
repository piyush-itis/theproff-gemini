from prisma import Prisma

db = Prisma()

async def connect_db():
    await db.connect()

async def disconnect_db():
    await db.disconnect()# Backend change 4
# Backend change 4
