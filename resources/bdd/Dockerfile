FROM postgres:17.2

# Copiar el archivo SQL para inicializar la base de datos
COPY database_backup.sql /docker-entrypoint-initdb.d/

# Exponer el puerto de PostgreSQL
EXPOSE 5432