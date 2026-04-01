<?php

namespace App\Services;

use App\DAO\CategorieDAO;

class CategorieService
{
    /**
     * Create a new class instance.
     */
    protected $categorieDAO;

    public function __construct(CategorieDAO $categorieDAO)
    {
        $this->categorieDAO = $categorieDAO;
    }
    public function listActiveCategories()
    {
        return $this->categorieDAO->getActiveCategories();
    }
    public function createCategorie(array $data)
    {
        return $this->categorieDAO->create($data);
    }
    public function getCategoryDetails(int $id)
    {
        return $this->categorieDAO->findWithServices($id);
    }
    public function updateCategorie(int $id, array $data)
    {
        return $this->categorieDAO->update($id, $data);
    }
}
