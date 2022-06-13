"""empty message

Revision ID: 17312bb88774
Revises: 476613ec3f14
Create Date: 2022-06-12 14:37:04.494693

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17312bb88774'
down_revision = '476613ec3f14'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('order_products')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order_products',
    sa.Column('order_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('quantity', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], name='order_products_order_id_fkey'),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name='order_products_product_id_fkey'),
    sa.PrimaryKeyConstraint('order_id', 'product_id', name='order_products_pkey')
    )
    op.drop_table('order_items')
    # ### end Alembic commands ###